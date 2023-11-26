import fs from "fs/promises";
import { google, youtube_v3 } from "googleapis";
import { OAuth2Client } from "google-auth-library";
import { ipcMain } from "electron";
var OAuth2 = google.auth.OAuth2;

interface ClientSecretJson {
  installed: Installed;
}

interface Installed {
  client_id: string;
  project_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url: string;
  client_secret: string;
  redirect_uris: string[];
}

export class YouTubeService {
  private readonly SCOPES = [
    "https://www.googleapis.com/auth/youtube.readonly",
    "https://www.googleapis.com/auth/youtube",
  ];
  private readonly TOKEN_DIR = `${
    process.env.USERPROFILE || process.env.HOME || process.env.HOMEPATH
  }/.credentials/`;
  private readonly TOKEN_PATH = `${this.TOKEN_DIR}credentials.json`;
  private readonly clientSecret: ClientSecretJson | null = null;
  private authClient: OAuth2Client | null = null;

  private constructor(clientSecretJson: string) {
    this.clientSecret = JSON.parse(clientSecretJson);
  }

  static createService = async (): Promise<YouTubeService> => {
    try {
      const json = await fs.readFile("client_secret.json", {
        encoding: "utf8",
      });
      return new YouTubeService(json);
    } catch (error) {
      console.error("client_secret.json file probably doesn't exist...");
      throw new Error("client_secret.json not found.");
    }
  };

  authoriseUser = async (): Promise<void> => {
    if (!this.clientSecret) {
      return;
    }
    var clientSecret = this.clientSecret.installed.client_secret;
    var clientId = this.clientSecret.installed.client_id;
    var redirectUrl = this.clientSecret.installed.redirect_uris[0];
    var oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);

    await fs
      .readFile(this.TOKEN_PATH, { encoding: "utf8" })
      .then((token) => {
        oauth2Client.credentials = JSON.parse(token);
        this.authClient = oauth2Client;
        ipcMain.emit("authenticated", null);
      })
      .catch(() => {
        var authUrl = oauth2Client.generateAuthUrl({
          access_type: "offline",
          scope: this.SCOPES,
        });
        require("electron").shell.openExternal(authUrl);
      });
  };

  handleCode = async (code: string) => {
    if (!this.clientSecret) {
      return;
    }
    var clientSecret = this.clientSecret.installed.client_secret;
    var clientId = this.clientSecret.installed.client_id;
    var redirectUrl = this.clientSecret.installed.redirect_uris[0];
    var oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);

    oauth2Client.getToken(code, async (err, token) => {
      if (err) {
        console.log("Error while trying to retrieve access token", err);
        return;
      }
      await this.storeToken(token);
      await this.authoriseUser();
    });
  };

  storeToken = async (token: any): Promise<void> => {
    await fs.mkdir(this.TOKEN_DIR).catch((err) => {
      if ((err as { code: string }).code != "EEXIST") {
        throw err;
      }
    });
    await fs
      .writeFile(this.TOKEN_PATH, JSON.stringify(token))
      .then(() => console.log("Token stored to " + this.TOKEN_PATH));
  };

  getPlaylists = async (): Promise<youtube_v3.Schema$Playlist[]> => {
    if (!this.authClient) {
      return [];
    }
    var service = google.youtube("v3");
    try {
      const response = await service.playlists.list({
        auth: this.authClient,
        part: ["snippet", "contentDetails"],
        mine: true,
        maxResults: 25,
      });
      return response.data.items || [];
    } catch (error) {
      console.error(error);
      return [];
    }
  };
}

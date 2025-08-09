export interface RefreshAccessTokenPayload {
  refresh_token: string;
}

export interface RefreshAccessTokenResponse {
  status: string;
  data: {
    access_token: string;
    expires_in: number;
    token_type: string;
    scope: string;
    id_token: string;
  };
}

export interface updateGDriveResponse {

}

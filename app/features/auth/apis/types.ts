export interface FetchAuthTokensPayload {
  code: string;
  redirect_uri: string;
}

export interface FetchAuthTokensResponse {
  status: string;
  data: {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    token_type: string;
    scope: string;
    id_token: string;
  };
}

export interface RevokeAuthTokensResponse {
  status: string;
  message: string;
}

export interface FetchProfileResponse {
  sub: string;
  name: string;
  given_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
}

export interface FetchFileListFromDrivePayload {
  q: string;
  spaces: string;
  key: string;
}

export interface FetchFileListFromDriveResponse {
  kind: string;
  incompleteSearch: boolean;
  files: { kind: string; id: string; name: string; mimeType: string }[];
}

export interface CreateGDriveFileResponse {
  id: string;
}

export interface FetchFileFromDrivePayload {
  id: string;
  params: {
    alt: string;
    key: string;
  };
}

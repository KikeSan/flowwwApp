export interface GhUserModel {
  login:             string;
  id:                number;
  nodeID:            string;
  avatarURL:         string;
  gravatarID:        string;
  url:               string;
  htmlURL:           string;
  followersURL:      string;
  followingURL:      string;
  gistsURL:          string;
  starredURL:        string;
  subscriptionsURL:  string;
  organizationsURL:  string;
  reposURL:          string;
  eventsURL:         string;
  receivedEventsURL: string;
  type:              string;
  userViewType:      string;
  siteAdmin:         boolean;
  score:             number;
}

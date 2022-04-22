import { environment } from '../../../environments/environment';

const baseApi = environment.apiBaseUrl;


export const ApiUrlsConfig = {
  auth: {
    login: (username: string) => `${baseApi}/users?username=${username}`,
    register: () => `${baseApi}/users`
  },
  job: () => `${baseApi}/jobs`,
  jobById: (id: number | string) => `${baseApi}/jobs/${id}`,
  jobForRecruiter: (username: string) => `${baseApi}/jobs?postedBy=${username}`,
  favouriteJobs: () => `${baseApi}/favouriteJobs`
};

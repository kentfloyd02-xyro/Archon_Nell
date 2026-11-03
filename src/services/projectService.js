import { request } from './client';

export const projectService = {
  getProjects: () => request('/projects')
};

export default projectService;

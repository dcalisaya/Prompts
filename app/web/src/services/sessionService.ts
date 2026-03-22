import type { Session, Prompt, Flow } from './types';

const STORAGE_KEY = 'workspace_sessions';

export const listSessions = (): Session[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch (e) {
    console.error('Error parsing sessions from localStorage', e);
    return [];
  }
};

export const getSession = (id: string): Session | undefined => {
  return listSessions().find(s => s.id === id);
};

export const saveSession = (session: Session): void => {
  const sessions = listSessions();
  const index = sessions.findIndex(s => s.id === session.id);
  
  const updatedSession = {
    ...session,
    updatedAt: new Date().toISOString()
  };

  if (index >= 0) {
    sessions[index] = updatedSession;
  } else {
    sessions.unshift(updatedSession);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
};

export const deleteSession = (id: string): void => {
  const sessions = listSessions().filter(s => s.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
};

export const createFromPrompt = (prompt: Prompt): Session => {
  const session: Session = {
    id: `sess-${Date.now()}`,
    title: prompt.name,
    originType: 'prompt',
    originId: prompt.id,
    status: 'draft',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lastStep: 'edit',
    payload: {}
  };
  saveSession(session);
  return session;
};

export const createFromFlow = (flow: Flow): Session => {
  const session: Session = {
    id: `sess-${Date.now()}`,
    title: flow.name,
    originType: 'flow',
    originId: flow.id,
    status: 'draft',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lastStep: '0',
    payload: {
      flowState: {
        currentStepIdx: 0,
        completedExecutions: []
      }
    }
  };
  saveSession(session);
  return session;
};

import React, { useContext, useRef, useCallback, useMemo } from 'react';
import type { AnyWorkspace, WorkspaceComponent } from '../';

export type AnyWorkspaceComponent =
  | WorkspaceComponent<'My Queries'>
  | WorkspaceComponent<'Performance'>
  | WorkspaceComponent<'Databases'>
  | WorkspaceComponent<'Collections'>
  | WorkspaceComponent<'Collection'>;

const WorkspacesContext = React.createContext<AnyWorkspaceComponent[]>([]);

export const WorkspacesProvider: React.FunctionComponent<{
  value: AnyWorkspaceComponent[];
}> = ({ value, children }) => {
  const valueRef = useRef(value);
  return (
    <WorkspacesContext.Provider value={valueRef.current}>
      {children}
    </WorkspacesContext.Provider>
  );
};

export const useWorkspacePlugins = () => {
  const workspaces = useContext(WorkspacesContext);
  const hasWorkspacePlugin = useCallback(
    <T extends AnyWorkspace['type']>(name: T) => {
      return workspaces.some((ws) => ws.name === name);
    },
    [workspaces]
  );
  const getWorkspacePluginByName = useCallback(
    <T extends AnyWorkspace['type']>(name: T) => {
      const plugin = workspaces.find((workspace) => workspace.name === name);
      if (!plugin) {
        throw new Error(
          `Component for workspace "${name}" is missing in context. Did you forget to set up WorkspacesProvider?`
        );
      }
      return plugin.component as unknown as WorkspaceComponent<T>['component'];
    },
    [workspaces]
  );
  return useMemo(() => {
    return { hasWorkspacePlugin, getWorkspacePluginByName };
  }, [hasWorkspacePlugin, getWorkspacePluginByName]);
};

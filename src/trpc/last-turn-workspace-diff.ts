import type { RuntimeTaskSessionSummary, RuntimeWorkspaceChangesResponse } from "../core/api-contract";
import { getWorkspaceChangesBetweenRefs, getWorkspaceChangesFromRef } from "../workspace/get-workspace-changes";

export async function loadLastTurnWorkspaceChanges(
	cwd: string,
	summary: RuntimeTaskSessionSummary,
): Promise<RuntimeWorkspaceChangesResponse | null> {
	const toCheckpoint = summary.latestTurnCheckpoint;
	const fromCheckpoint = summary.previousTurnCheckpoint;
	if (!toCheckpoint) {
		return null;
	}
	if (!fromCheckpoint) {
		return await getWorkspaceChangesFromRef({
			cwd,
			fromRef: toCheckpoint.commit,
		});
	}
	return await getWorkspaceChangesBetweenRefs({
		cwd,
		fromRef: fromCheckpoint.commit,
		toRef: toCheckpoint.commit,
	});
}

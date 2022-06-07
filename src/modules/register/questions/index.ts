export const stepNames = ['basic', 'additional', 'core', 'branch'] as const
export type StepName = typeof stepNames[number]

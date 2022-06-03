import { Choice, InputType, Question, WeakQuestion } from '../types'

export function makeQuestion(question: WeakQuestion): Question {
  return {
    ...question,
    inputs: question.inputs.map((input, index) => {
      if (input.type === InputType.NONE) return input
      if (input.type === InputType.CHECKBOX) {
        const { choices, name, ...rest } = input
        const newChoices: Choice[] = choices.map((choice, cIndex) => ({
          name: `${question.name}_Q${index}_C${cIndex}`,
          value: choice,
        }))
        return {
          ...rest,
          name: name ? name : `${question.name}_Q${index}`,
          choices: newChoices,
        }
      }
      const key = input.name ? input.name : `${question.name}_Q${index}`
      return {
        ...input,
        name: key,
      }
    }),
  }
}

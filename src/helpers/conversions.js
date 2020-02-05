import { constructDate } from './dates'

export function convertBedToCurrentStage(bed, date) {
    return bed.stages.find(stage => date.getTime() >= constructDate(stage.start_date).getTime() && (!stage.due_date || date.getTime() <= constructDate(stage.due_date).getTime()))
}
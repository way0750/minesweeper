export default function (previousState, action) {
  
  if (action.type === 'ChangeUserActionType') {
    return action.payload;
  } else if (action.type === 'matrixGenerate') {
    return 'click';
  }
  return previousState || 'click';
}

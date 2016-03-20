export default function (previousState, action) {
  let iconUrl = {
    'click': 'https://cldup.com/g0zM8B8B3g.png',
    'placeFlag': 'https://cldup.com/QKrrJwkzUk.png'
  };

  if (action.type === 'ChangeUserActionType') {
    return {
      name: action.payload,
      icon: iconUrl[action.payload],
    };
  } else if (action.type === 'matrixGenerate') {
    return {
      name: 'click',
      icon: iconUrl.click  
    };
  }
  return previousState || {
    name: 'click',
    icon: iconUrl.click
  };
}

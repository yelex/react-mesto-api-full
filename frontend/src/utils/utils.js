export function setTextContent(elemRecipient, elemDonorValue){
  elemRecipient.textContent = elemDonorValue;
}

export const getIds = (likes) => {
  return likes.map(likeObj => { return likeObj._id })
}

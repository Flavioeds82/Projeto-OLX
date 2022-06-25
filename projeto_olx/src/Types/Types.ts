export type State = {
   id: string,
   name: string
}
export type Category = {
   _id: string,
   name: string,
   slug: string,
   img: string
}
export type Ad = {
   id:string,
   images: Array<object>,
   status: boolean,
   idUser: string,
   state: string,
   title: string,
   category: string,
   price: number,
   priceNegotiable: boolean,
   description: string,
   views: number
}

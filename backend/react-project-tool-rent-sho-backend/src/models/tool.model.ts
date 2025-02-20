import {OrderDetails} from "@prisma/client";

class Tool {
    id: number
    name: string
    picture: string
    description :    String
    rentPricePerDay : number
    remainingCount :  number
    category_id:    number
    orderDetails :    OrderDetails[]

  constructor(id: number, name: string, picture: string, description: string, rentPricePerDay: number, remainingCount :  number,category_id: number, orderDetails : OrderDetails[]){
        this.id = id
        this.name = name
        this.picture = picture
        this.description = description
        this.rentPricePerDay = rentPricePerDay
        this.remainingCount = remainingCount
        this.category_id= category_id
        this.orderDetails = orderDetails

  }
}

export default Tool


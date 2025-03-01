interface OrderDetails {
    id     :  String
    order_id : String
    tool_id : String
    qty     : number

}

export default interface orderModel {
    id :          String
    user_id :      String
    user_name :    String
    date    :     Date
    fullPrice :    number
    discount :    number
    description :  String
    orderDetails : OrderDetails[]
}

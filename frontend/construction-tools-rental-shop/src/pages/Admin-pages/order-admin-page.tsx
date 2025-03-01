import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Pencil, Trash2, ChevronDown } from "lucide-react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {AppDispatch, RootState} from "../../store/store";
import {deleteOrder, getOrders, updateOrder} from "../../reducers/orderReducer.ts";


export default function OrderAdminPage() {
    const dispatch = useDispatch<AppDispatch>();
    const orders = useSelector((state: RootState) => state.order);

    const [openModal, setOpenModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<any>(null);
    const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

    useEffect(() => {
        dispatch(getOrders());
    }, [dispatch]);

    const toggleExpandRow = (id: string) => {
        setExpandedRows((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const handleDelete = (id: string) => {
        if (window.confirm("Are you sure you want to delete this order?")) {
            dispatch(deleteOrder(id))
                .then(() => {
                    toast.success("Order deleted successfully!", { position: "top-right", transition: Bounce });
                    dispatch(getOrders());
                })
                .catch(() => {
                    toast.error("Error deleting order!", { position: "top-right", transition: Bounce });
                });
        }
    };

    const handleRowClick = (order: any) => {
        setSelectedOrder(order);
        setOpenModal(true);
    };

    const handleClose = () => {
        setOpenModal(false);
        setSelectedOrder(null);
    };

    const handleUpdate = () => {
        if (selectedOrder) {
            dispatch(updateOrder({ id: selectedOrder.id, updatedOrder: selectedOrder }))
                .then(() => {
                    toast.success("Order updated successfully!", { position: "top-right", transition: Bounce });
                    setOpenModal(false);
                })
                .catch(() => {
                    toast.error("Error updating order!", { position: "top-right", transition: Bounce });
                });
        }
    };

    const columns: GridColDef[] = [
        {
            field: "expand",
            headerName: "",
            width: 50,
            sortable: false,
            renderCell: (params) => (
                <button onClick={() => toggleExpandRow(params.row.id)} className="p-1 text-gray-600">
                    <ChevronDown size={16} className={expandedRows[params.row.id] ? "rotate-180" : ""} />
                </button>
            ),
        },
        { field: "user_name", headerName: "Customer", width: 150 },
        { field: "date", headerName: "Date", width: 150 },
        { field: "fullPrice", headerName: "Full Price", width: 120, type: "number" },
        { field: "discount", headerName: "Discount", width: 100, type: "number" },
        { field: "description", headerName: "Description", width: 250 },
        {
            field: "delete",
            headerName: "Delete",
            width: 80,
            renderCell: (params) => (
                <button onClick={() => handleDelete(params.row.id)} className="p-1 text-red-600 hover:text-red-800">
                    <Trash2 size={16} />
                </button>
            ),
        },
        {
            field: "update",
            headerName: "Update",
            width: 80,
            renderCell: (params) => (
                <button onClick={() => handleRowClick(params.row)} className="p-1 text-blue-600 hover:text-blue-800">
                    <Pencil size={16} />
                </button>
            ),
        },
    ];

    return (
        <>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick={false} pauseOnHover draggable theme="light" transition={Bounce} />

            <Paper sx={{ height: 600, width: "100%" }}>
                <DataGrid
                    rows={orders}
                    columns={columns}
                    pageSizeOptions={[10, 10]}
                    checkboxSelection
                    sx={{ border: 0 }}
                    getRowHeight={(params) => (expandedRows[params.id] ? 200 : 50)}
                    renderRow={(params) => (
                        <>
                            <div className="flex items-center">
                                {params.columns.map((col) => (
                                    <div key={col.field} className="p-2">
                                        {params.getValue(col.field)}
                                    </div>
                                ))}
                            </div>
                            {expandedRows[params.id] && (
                                <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                                    <h3 className="text-sm font-semibold">Order Details:</h3>
                                    <ul>
                                        {params.row.orderDetails.map((detail: any) => (
                                            <li key={detail.id} className="text-sm">
                                                <strong>Tool ID:</strong> {detail.tool_id}, <strong>Qty:</strong> {detail.qty}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </>
                    )}
                />
            </Paper>

            <Dialog open={openModal} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>Order Details</DialogTitle>
                <DialogContent>
                    {selectedOrder && (
                        <>
                            <TextField
                                fullWidth
                                margin="dense"
                                label="Customer Name"
                                value={selectedOrder.user_name || ""}
                                onChange={(e) => setSelectedOrder({ ...selectedOrder, user_name: e.target.value })}
                            />
                            <TextField
                                fullWidth
                                margin="dense"
                                label="Full Price"
                                type="number"
                                value={selectedOrder.fullPrice || ""}
                                onChange={(e) => setSelectedOrder({ ...selectedOrder, fullPrice: e.target.value })}
                            />
                            <TextField
                                fullWidth
                                margin="dense"
                                label="Discount"
                                type="number"
                                value={selectedOrder.discount || ""}
                                onChange={(e) => setSelectedOrder({ ...selectedOrder, discount: e.target.value })}
                            />
                            <TextField
                                fullWidth
                                margin="dense"
                                label="Description"
                                value={selectedOrder.description || ""}
                                onChange={(e) => setSelectedOrder({ ...selectedOrder, description: e.target.value })}
                            />
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">Cancel</Button>
                    <Button onClick={handleUpdate} color="primary" variant="contained">Update</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

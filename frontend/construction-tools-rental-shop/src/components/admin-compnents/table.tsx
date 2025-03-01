import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Pencil, Trash2 } from "lucide-react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, CircularProgress } from "@mui/material";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppDispatch, RootState } from "../../store/store.ts";
import { deleteTool, getTools, updateTool } from "../../reducers/toolReducer.ts";

export default function DataTable() {
    const dispatch = useDispatch<AppDispatch>();
    const tools = useSelector((state: RootState) => state.tool);

    const [loading, setLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [selectedTool, setSelectedTool] = useState<any>(null);

    useEffect(() => {
        dispatch(getTools()).then(() => setLoading(false));
    }, [dispatch]);

    const handleDelete = (id: string) => {
        if (window.confirm("Are you sure you want to delete this tool?")) {
            dispatch(deleteTool(id))
                .then(() => {
                    toast.success("Tool deleted successfully!", { position: "top-right", transition: Bounce });
                    dispatch(getTools());
                })
                .catch(() => {
                    toast.error("Error deleting tool!", { position: "top-right", transition: Bounce });
                });
        }
    };

    const handleRowClick = (tool: any) => {
        setSelectedTool(tool);
        setOpenModal(true);
    };

    const handleClose = () => {
        setOpenModal(false);
        setSelectedTool(null);
    };

    const handleUpdate = () => {
        if (selectedTool) {
            if (window.confirm("Are you sure you want to update this tool?")) {
                dispatch(updateTool({ id: selectedTool.id, updatedTool: selectedTool }))
                    .then(() => {
                        toast.success("Tool updated successfully!", { position: "top-right", transition: Bounce });
                        dispatch(getTools());
                        setOpenModal(false);
                    })
                    .catch(() => {
                        toast.error("Error updating tool!", { position: "top-right", transition: Bounce });
                    });
            }
        }
    };

    const columns: GridColDef[] = [
        {
            field: "picture",
            headerName: "Image",
            width: 100,
            renderCell: (params) => (
                <img src={params.value} alt="Tool" className="w-12 h-12 object-cover rounded-md" />
            ),
            sortable: false,
        },
        { field: "name", headerName: "Tool Name", width: 150 },
        { field: "description", headerName: "Description", width: 250 },
        {
            field: "rentPricePerDay",
            headerName: "Rent Price (Per Day)",
            width: 150,
            type: "number",
        },
        {
            field: "remainingCount",
            headerName: "Stock Available",
            width: 150,
            type: "number",
        },
        {
            field: "delete",
            headerName: "Delete",
            width: 80,
            renderCell: (params) => (
                <button
                    onClick={() => handleDelete(params.row.id)}
                    className="p-1 text-red-600 hover:text-red-800"
                >
                    <Trash2 size={16} />
                </button>
            ),
        },
        {
            field: "update",
            headerName: "Update",
            width: 80,
            renderCell: (params) => (
                <button
                    onClick={() => handleRowClick(params.row)}
                    className="p-1 text-blue-600 hover:text-blue-800"
                >
                    <Pencil size={16} />
                </button>
            ),
        },
    ];

    return (
        <>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick={false} pauseOnHover draggable theme="light" transition={Bounce} />

            <Paper sx={{ height: 600, width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                {loading ? (
                    <CircularProgress />
                ) : (
                    <DataGrid rows={tools} columns={columns} pageSizeOptions={[10, 10]} checkboxSelection sx={{ border: 0 }} />
                )}
            </Paper>

            <Dialog open={openModal} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>Tool Details</DialogTitle>
                <DialogContent>
                    {selectedTool && (
                        <>
                            <TextField
                                fullWidth
                                margin="dense"
                                label="Tool Name"
                                value={selectedTool.name || ""}
                                onChange={(e) => setSelectedTool({ ...selectedTool, name: e.target.value })}
                            />
                            <TextField
                                fullWidth
                                margin="dense"
                                label="Description"
                                value={selectedTool.description || ""}
                                onChange={(e) => setSelectedTool({ ...selectedTool, description: e.target.value })}
                            />
                            <TextField
                                fullWidth
                                margin="dense"
                                label="Rent Price Per Day"
                                type="number"
                                value={selectedTool.rentPricePerDay || ""}
                                onChange={(e) => setSelectedTool({ ...selectedTool, rentPricePerDay: Number(e.target.value) })}
                            />
                            <TextField
                                fullWidth
                                margin="dense"
                                label="Stock Available"
                                type="number"
                                value={selectedTool.remainingCount || ""}
                                onChange={(e) => setSelectedTool({ ...selectedTool, remainingCount: Number(e.target.value) })}
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

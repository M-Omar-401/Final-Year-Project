// import React, { useState, useEffect } from 'react'
// import axios from 'axios'
// import { Button } from '@mui/material';
// import { Navigate } from 'react-router-dom';
// import { useNavigate } from 'react-router'
// import MUIDataTable from 'mui-datatables'
// import { Typography } from '@mui/material';
// import { UserContext } from '../context/User';
// import Select from '@mui/material/Select'
// import FormControl from '@mui/material/FormControl'
// import InputLabel from '@mui/material/InputLabel'
// import MenuItem from '@mui/material/MenuItem'
// import Swal from 'sweetalert2';


// function Viewdac() {

//     let [dacs, setdacs] = useState([]);
//     let [update, setupdate] = useState(false);
//     const navigate = useNavigate();

//     let get_all_dacs = async () => {
//         const response = await axios.get("/get_all_dacs");
//         setdacs(response.data);
//     }
//     const getuserbyid = async (id) => {
//         try {
//             const response = await axios.get(`http://localhost:5000/get_user_by_id/${id}/teacher`);
//             // console.log("teacher id : "+response.data[0]._id);
//             return response.data[0]
//         } catch (error) {
//             console.error(`Error fetching `, error)
//             return null // or handle the error in an appropriate way
//         }
//     }
//     let upadateData = async () => {

//         // const _data = await Promise.all(commetties?.map(async (comm, index) => {
//         //     let students = await get_studets_with_commetti_id(comm._id);
//         //     comm['students'] = students;
//         //     return comm;

//         // }));

//         const new_data = await Promise.all(dacs?.map(async (dac, index) => {
//             let teachers = await Promise.all(dac.dac_members.map(async (item) => {
//                 let teacher = await getuserbyid(item);
//                 if (item == dac.dac_head) {
//                     dac['dac_head_name'] = teacher.name;
//                 }
//                 return teacher;
//             }));

//             dac['members_name'] = teachers;
//             return dac;
//         }));

//         // console.log(new_data);
//         setdacs(new_data);
//         setupdate(true);
//     }

//     useEffect(() => {
//         if (dacs.length > 0 && !update) {
//             upadateData();
//         }
//         else if (!update) {
//             get_all_dacs();
//         }
//     }, [dacs]);

//     let deletedac = async (id) => {

//         const response = await axios.post("/delete_dac", {
//             '_id': id
//         });

//         if (response.data.result == 'deleted') {
//             get_all_dacs();
//         } else {
//             Swal.fire("Cann't delete commetti! Assigned to students")
//         }
//     }

//     const columns = [
//         {
//             name: 'dac_title',
//             label: 'Title',
//             options: {
//                 sort: false,
//                 filter: false
//             }
//         },
//         {
//             name: 'dac_department',
//             label: 'Department',
//         },
//         {
//             name: 'dac_members',
//             label: 'Members count',
//             options: {
//                 sort: false,
//                 customBodyRender: (value, tableMeta) => {
//                     const statusStyle = {
//                         padding: '6px 4px',
//                         width: '100px',
//                         background: '#eeeeee',
//                         color: '#333333',
//                         borderRadius: '4px',
//                         textAlign: 'center'
//                     }
//                     let isAvailable
//                     if (value) {
//                         isAvailable = 'YES'
//                     } else {
//                         isAvailable = 'NO'
//                     }
//                     if (isAvailable) {

//                         return (
//                             <Typography
//                                 className="details-text"
//                                 sx={{}}
//                             >
//                                 {value?.length}
//                             </Typography>
//                         )


//                     }
//                 }
//             }
//         },
//         {
//             name: 'members_name',
//             label: 'Members',
//             options: {
//                 sort: false,
//                 filter: false,
//                 customBodyRender: (value, tableMeta) => {
//                     const statusStyle = {
//                         padding: '6px 4px',
//                         width: '100px',
//                         background: '#eeeeee',
//                         color: '#333333',
//                         borderRadius: '4px',
//                         textAlign: 'center'
//                     }
//                     let isAvailable
//                     if (value) {
//                         isAvailable = 'YES'
//                     } else {
//                         isAvailable = 'NO'
//                     }
//                     if (isAvailable) {
//                         return (
//                             <>
//                                 {
//                                     value?.length > 0 &&
//                                     <>
//                                         {
//                                             value.map((item) => {
//                                                 return <Typography
//                                                     className="details-text"
//                                                     sx={{}}
//                                                 >
//                                                     {item.name}
//                                                 </Typography>
//                                             })
//                                         }
//                                     </>
//                                 }
//                             </>
//                         )
//                     }
//                 }
//             }
//         },
//         {
//             name: 'dac_head_name',
//             label: 'DAC Head',
//         },
//         // {
//         //     name: 'students',
//         //     label: 'Students',
//         //     options: {
//         //         sort: false,
//         //         filter: false,
//         //         customBodyRender: (value, tableMeta) => {
//         //             const statusStyle = {
//         //                 padding: '6px 4px',
//         //                 width: '100px',
//         //                 background: '#eeeeee',
//         //                 color: '#333333',
//         //                 borderRadius: '4px',
//         //                 textAlign: 'center'
//         //             }
//         //             let isAvailable
//         //             if (value) {
//         //                 isAvailable = 'YES'
//         //             } else {
//         //                 isAvailable = 'NO'
//         //             }
//         //             if (isAvailable) {
//         //                 return (
//         //                     <>
//         //                         {value?.length > 0 &&
//         //                             <>
//         //                                 {
//         //                                     value.map((item) => {
//         //                                         return <Typography
//         //                                             className="details-text"
//         //                                             sx={{}}
//         //                                         >
//         //                                             {item.name}
//         //                                         </Typography>
//         //                                     })
//         //                                 }
//         //                             </>
//         //                         }
//         //                         {value?.length == 0 &&
//         //                             <>
//         //                                 <Typography
//         //                                     className="details-text"
//         //                                     sx={{}}
//         //                                 >
//         //                                     {'No Students'}
//         //                                 </Typography>
//         //                             </>

//         //                         }
//         //                     </>
//         //                 )
//         //             }
//         //         }
//         //     }
//         // },
//         {
//             name: '_id',
//             label: 'Action',
//             options: {
//                 sort: false,
//                 filter: false,
//                 customBodyRender: (value, tableMeta) => {
//                     const statusStyle = {
//                         padding: '6px 4px',
//                         width: '100px',
//                         background: '#eeeeee',
//                         color: '#333333',
//                         borderRadius: '4px',
//                         textAlign: 'center'
//                     }
//                     let isAvailable
//                     if (value) {
//                         isAvailable = 'YES'
//                     } else {
//                         isAvailable = 'NO'
//                     }
//                     if (isAvailable) {
//                         return (
//                             <a
//                                 className="details-text"
//                                 style={{ cursor: 'pointer' }}
//                                 onClick={() => { deletedac(value) }}
//                             >
//                                 Delete
//                             </a>

//                         )
//                     }
//                 }
//             }
//         }
//     ]

//     const HeaderElements = () => {
//         // return (
//         //     <Button type="button" onClick={() => console.log('Clicked')}>
//         //         + Add Booking
//         //     </Button>
//         // );
//     }

//     const options = {
//         customHeadRender: () => ({
//             style: {
//                 fontFamily: 'Outfit',
//                 fontSize: '48px',
//                 fontWeight: 500,
//                 lineHeight: '24px',
//                 letterSpacing: '0',
//                 textAlign: 'center'
//             }
//         }),
//         responsive: 'standard',
//         print: false,
//         download: false,
//         viewColumns: false,
//         tableLayout: 'fixed',
//         customTableBodyWidth: 'auto',
//         tableBodyHeight: 'auto',
//         selectableRowsHideCheckboxes: true,
//         customToolbar: HeaderElements
//     }

//     return (
//         <>
//             <div className='' style={{ width: "auto" }}>
//                 <Button variant="contained" color="primary" onClick={() => { navigate('Adddac') }} style={{ marginTop: '10px' }}>
//                     create DAC
//                 </Button>
//                 <div>
//                     <div className='mt-5'>
//                         <MUIDataTable data={dacs} columns={columns} options={options} />
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Viewdac
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button } from '@mui/material'
import { Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router'
import MUIDataTable from 'mui-datatables'
import { Typography } from '@mui/material'
import { UserContext } from '../context/User'
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Swal from 'sweetalert2'
import { FaPeopleGroup } from "react-icons/fa6";
import { createTheme, ThemeProvider } from '@mui/material/styles'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

function Viewdac() {
    let [dacs, setdacs] = useState([])
    let [update, setupdate] = useState(false)
    const navigate = useNavigate()

    let get_all_dacs = async () => {
        const response = await axios.get('/get_all_dacs')
        setdacs(response.data)
    }
    const getuserbyid = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/get_user_by_id/${id}/teacher`)
            // console.log("teacher id : "+response.data[0]._id);
            return response.data[0]
        } catch (error) {
            console.error(`Error fetching `, error)
            return null // or handle the error in an appropriate way
        }
    }
    let upadateData = async () => {
        // const _data = await Promise.all(commetties?.map(async (comm, index) => {
        //     let students = await get_studets_with_commetti_id(comm._id);
        //     comm['students'] = students;
        //     return comm;

        // }));

        const new_data = await Promise.all(
            dacs?.map(async (dac, index) => {
                let teachers = await Promise.all(
                    dac.dac_members.map(async (item) => {
                        let teacher = await getuserbyid(item)
                        if (item == dac.dac_head) {
                            dac['dac_head_name'] = teacher.name
                        }
                        return teacher
                    })
                )

                dac['members_name'] = teachers
                return dac
            })
        )

        // console.log(new_data);
        setdacs(new_data)
        setupdate(true)
    }

    useEffect(() => {
        if (dacs.length > 0 && !update) {
            upadateData()
        } else if (!update) {
            get_all_dacs()
        }
    }, [dacs])

    let deletedac = async (id) => {
        const response = await axios.post('/delete_dac', {
            _id: id
        })

        if (response.data.result == 'deleted') {
            get_all_dacs()
        } else {
            Swal.fire("Cann't delete commetti! Assigned to students")
        }
    }

    const columns = [
        {
            name: 'dac_title',
            label: 'Title',
            options: {
                sort: false,
                filter: false
            }
        },
        {
            name: 'dac_department',
            label: 'Department'
        },
        {
            name: 'dac_members',
            label: 'Members count',
            options: {
                sort: false,
                customBodyRender: (value, tableMeta) => {
                    const statusStyle = {
                        padding: '6px 4px',
                        width: '100px',
                        background: '#eeeeee',
                        color: '#333333',
                        borderRadius: '4px',
                        textAlign: 'center'
                    }
                    let isAvailable
                    if (value) {
                        isAvailable = 'YES'
                    } else {
                        isAvailable = 'NO'
                    }
                    if (isAvailable) {
                        return (
                            <Typography className="details-text" sx={{}}>
                                {value?.length}
                            </Typography>
                        )
                    }
                }
            }
        },
        {
            name: 'members_name',
            label: 'Members',
            options: {
                sort: false,
                filter: false,
                customBodyRender: (value, tableMeta) => {
                    const statusStyle = {
                        padding: '6px 4px',
                        width: '100px',
                        background: '#eeeeee',
                        color: '#333333',
                        borderRadius: '4px',
                        textAlign: 'center'
                    }
                    let isAvailable
                    if (value) {
                        isAvailable = 'YES'
                    } else {
                        isAvailable = 'NO'
                    }
                    if (isAvailable) {
                        return (
                            <>
                                {value?.length > 0 && (
                                    <>
                                        {value.map((item) => {
                                            return (
                                                <Typography className="details-text" sx={{}}>
                                                    {item.name}
                                                </Typography>
                                            )
                                        })}
                                    </>
                                )}
                            </>
                        )
                    }
                }
            }
        },
        {
            name: 'dac_head_name',
            label: 'DAC Head'
        },
        // {
        //     name: 'students',
        //     label: 'Students',
        //     options: {
        //         sort: false,
        //         filter: false,
        //         customBodyRender: (value, tableMeta) => {
        //             const statusStyle = {
        //                 padding: '6px 4px',
        //                 width: '100px',
        //                 background: '#eeeeee',
        //                 color: '#333333',
        //                 borderRadius: '4px',
        //                 textAlign: 'center'
        //             }
        //             let isAvailable
        //             if (value) {
        //                 isAvailable = 'YES'
        //             } else {
        //                 isAvailable = 'NO'
        //             }
        //             if (isAvailable) {
        //                 return (
        //                     <>
        //                         {value?.length > 0 &&
        //                             <>
        //                                 {
        //                                     value.map((item) => {
        //                                         return <Typography
        //                                             className="details-text"
        //                                             sx={{}}
        //                                         >
        //                                             {item.name}
        //                                         </Typography>
        //                                     })
        //                                 }
        //                             </>
        //                         }
        //                         {value?.length == 0 &&
        //                             <>
        //                                 <Typography
        //                                     className="details-text"
        //                                     sx={{}}
        //                                 >
        //                                     {'No Students'}
        //                                 </Typography>
        //                             </>

        //                         }
        //                     </>
        //                 )
        //             }
        //         }
        //     }
        // },
        {
            name: '_id',
            label: 'Action',
            options: {
                sort: false,
                filter: false,
                customBodyRender: (value, tableMeta) => {
                    const statusStyle = {
                        padding: '6px 4px',
                        width: '100px',
                        background: '#eeeeee',
                        color: '#333333',
                        borderRadius: '4px',
                        textAlign: 'center'
                    }
                    let isAvailable
                    if (value) {
                        isAvailable = 'YES'
                    } else {
                        isAvailable = 'NO'
                    }
                    if (isAvailable) {
                        return (
                            <a
                                className="details-text"
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                    deletedac(value)
                                }}
                            ><DeleteForeverIcon style={{ color: 'red' }} />
                            &nbsp; Delete
                            </a>
                        )
                    }
                }
            }
        }
    ]

    const HeaderElements = () => {
        // return (
        //     <Button type="button" onClick={() => console.log('Clicked')}>
        //         + Add Booking
        //     </Button>
        // );
    }

    const options = {
        // filterType: "checkbox",
        // selecttablesRows: false,
        // selecttablesRows: false,
        // elevation: 0,
        // rowsPerPage: 5,
        // rowsPerPageOptions: [5, 10, 20, 30]
        filter: true,
        // filterType: 'checkbox',
        download: true,
        sort: false,
        responsive: 'vertical', // standard | vertical | simple
        // selectableRows: 'multiple',
        selectableRowsOnClick: false,
        print: true,
        viewColumns: false,
        searchOpen: false,
        search: true,
        page: 0,
        pageSize: 10,
        // rowsPerPage: 10,
        rowsPerPageOptions: [],
        // filterType: 'checkbox',
        elevation: 0,
        rowsPerPage: 5,
        rowsPerPageOptions: [5, 10, 20, 30]
    }
    const getMuiTheme = () =>
        createTheme({
            typography: {
                fontFamily: 'sans-serif'
            },
            palette: {
                background: {
                    paper: 'white',
                    default: 'white'
                },
                mode: 'light'
            },
            components: {
                MuiTableCell: {
                    styleOverrides: {
                        head: {
                            padding: '10px 4px',
                            border: '1px solid #545B6A',
                            fontWeight: 'bold',
                            fontFamily:'initial',
                            fontSize:'20px',
                            textAlign: 'center'
                        },
                        body: {
                            padding: '7px 15px',
                            // color: "#e2e8f0",
                            color: 'black',
                            backgroundColor: 'white',
                            border: '1px solid #545B6A',
                            fontSize:'15px',
                            fontFamily:'sans-serif',
                          
                        },
                        footer: {
                            backgroundColor: 'white',
                            border: '1px solid #545B6A'
                        }
                    }
                }
            }
        })

    return (
        <>
            <div className="" style={{ width: '1130px', marginTop: '10px' }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        navigate('Adddac')
                    }}
                    style={{
                        marginTop: '10px',
                        width: '400px',
                        height: '200px',
                        background: 'linear-gradient(45deg, #87a8d0 30%, #fc92e3 90%)', // Gradient colors here
                        borderRadius: '10px',
                        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                        color: '#0E1217',
                        fontSize: '25px',
                        fontWeight: 'bold',
                    }}
                >
                    <FaPeopleGroup  style={{ fontSize: '200px', color: '#0E1217' }} />
                    create DAC
                </Button>
                <div  style={{
                        marginTop: '20px',
                        backgroundColor: 'white',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        borderRadius: '8px',
                        padding: '20px',
                        color: '#0c0116'
                    }}>
                    <div className="">
                        <ThemeProvider theme={getMuiTheme()}>

                        <MUIDataTable data={dacs} columns={columns} options={options} />
                        </ThemeProvider>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Viewdac

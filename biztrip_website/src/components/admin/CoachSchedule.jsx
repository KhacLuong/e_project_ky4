import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {fetchAllSchedule, fetchGetAllLocation, fetchGetScheduleById} from "../../redux/slices/scheduleSlice.jsx";
import {BiPlus} from "react-icons/bi";
import {IoIosRemoveCircle} from "react-icons/io";
import {toast} from "react-toastify";

const CoachSchedule = ({coachFormState, setCoachFormState}) => {
    const dispatch = useDispatch()
    const [schedules, setSchedules] = useState([])
    const [locations, setLocations] = useState([])
    const [maxItem, setMaxItem] = useState(1)
    const [listFormState, setListFormState] = useState([])
    const [formState, setFormState] = useState({
        scheduleId: 0,
        scheduleDepartureId: 0,
        scheduleDestinationId: 0,
        pickUpPointList: [],
        dropOffPointList: [],
        timeDifference: 0,
    })

    useEffect(() => {
        const test = async () => {
            const resSchedule = await dispatch(fetchAllSchedule({})).unwrap()
            const resLocation = await dispatch(fetchGetAllLocation({})).unwrap()
            if (resSchedule && resSchedule.code === 200) {
                setSchedules(resSchedule.data)
            }
            if (resLocation && resLocation.code === 200) {

                setLocations(resLocation.data)
            }
        }
        test()
    }, [])


    const handleSelectChange = (event, index) => {
        const {name, value} = event.target;
        console.log(index)
        setListFormState(prevState => {
            return prevState.map((form, i) => {
                if (i === index) {
                    const test = async () => {
                        const res = await dispatch(fetchGetScheduleById({id: +value})).unwrap();
                        if (res && res.code === 200) {
                            setListFormState(prevState => {
                                const updatedList = [...prevState];
                                console.log(updatedList)
                                updatedList[index] = {
                                    ...updatedList[index],
                                    scheduleDepartureId: res.data?.departureId,
                                    scheduleDestinationId: res.data?.destinationId
                                };
                                return updatedList;
                            });
                        }
                    };
                    test();
                    return {
                        ...form,
                        [name]: value
                    };
                }
                return form;
            });
        });
    };
    const handleAddDeparture = (e, formIndex) => {
        e.preventDefault()
        setListFormState(prevState => {
            return prevState.map((formState, index) => {
                if (index === formIndex) {
                    const newDeparture = {
                        locationId: 0,
                        time: "",
                        status: "active",
                        default: false
                    };
                    return {
                        ...formState,
                        pickUpPointList: [...formState.pickUpPointList, newDeparture]
                    };
                }
                return formState;
            });
        });
    };
    const handleAddDestination = (e, formIndex) => {
        e.preventDefault()
        setListFormState(prevState => {
            return prevState.map((formState, index) => {
                if (index === formIndex) {
                    const newDestination = {
                        locationId: 0,
                        time: '',
                        status: 'active',
                        default: false
                    }
                    return {
                        ...formState,
                        dropOffPointList: [...formState.dropOffPointList, newDestination]
                    };
                }
                return formState;
            });
        });
    }
    const handleDeleteDeparture = (e, formIndex, departureIndex) => {
        e.preventDefault()
        setListFormState(prevState => {
            const updatedList = [...prevState];
            const updatedDeparture = [...updatedList[formIndex].pickUpPointList];
            updatedDeparture.splice(departureIndex, 1);
            updatedList[formIndex] = {
                ...updatedList[formIndex],
                pickUpPointList: updatedDeparture
            };
            return updatedList;
        });
    };
    const handleDeleteDestination = (e, formIndex, destinationIndex) => {
        e.preventDefault()
        setListFormState(prevState => {
            const updatedList = [...prevState];
            const updatedDestination = [...updatedList[formIndex].dropOffPointList];
            updatedDestination.splice(destinationIndex, 1);
            updatedList[formIndex] = {
                ...updatedList[formIndex],
                dropOffPointList: updatedDestination
            };
            return updatedList;
        });
    }
    const handleDepartureChange = (e, layoutIndex, index, property) => {
        e.preventDefault()
        const {value} = e.target;
        setListFormState(prevState => {
            const updatedList = [...prevState];
            const updatedDeparture = [...updatedList[layoutIndex].pickUpPointList];
            updatedDeparture[index] = {
                ...updatedDeparture[index],
                [property]: value
            };
            updatedList[layoutIndex] = {
                ...updatedList[layoutIndex],
                pickUpPointList: updatedDeparture
            };
            return updatedList;
        });
    };
    const handleDestinationChange = (e, layoutIndex, index, property) => {
        e.preventDefault()
        const {value} = e.target
        setListFormState(prevState => {
            const updatedList = [...prevState];
            const updateDestination = [...updatedList[layoutIndex].dropOffPointList];
            updateDestination[index] = {
                ...updateDestination[index],
                [property]: value
            };
            updatedList[layoutIndex] = {
                ...updatedList[layoutIndex],
                dropOffPointList: updateDestination
            };
            return updatedList;
        });
    }
    const renderListCoachScheduleLayout = (state, item) => {
        return (
            <div key={item} className={`overflow-hidden py-4 border-b-2 last:border-0`}>
                <div className={`mx-4 grid gap-6 grid-cols-1`}>
                    <div className={`w-full col-span-1`}>
                        <div className={`group relative z-0 w-1/2 mb-6`}>
                            <label htmlFor="schedule"
                                   className="block mb-2 text-sm font-medium text-gray-900">
                                Chọn lộ trình
                            </label>
                            <select id={`scheduleId`}
                                    name={`scheduleId`}
                                    onChange={(e) => handleSelectChange(e, item)}
                                    value={state.scheduleId}
                                    className={`bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-medium`}>
                                <option value={0}>-- Chọn --</option>
                                {
                                    schedules && schedules.length > 0 && schedules.map((item, index) => {
                                        if (item.status === 'active') {
                                            return (
                                                <option value={item.id} key={index}>
                                                    {item?.departure?.name} - {item?.destination?.name}
                                                </option>
                                            )
                                        }
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className={`w-full col-span-1`}>
                        <div className={`grid lg:grid-cols-2 gap-6 grid-cols-1`}>
                            <div className={`group relative z-0 w-full mb-6 shadow-xl rounded-xl p-4`}>
                                <div className={`flex justify-center items-center font-semibold text-lg`}>
                                    <h2>Điểm đón</h2>
                                </div>
                                <div className={`flex items-center justify-between my-4`}>
                                    <button type="button"
                                            onClick={(e) => handleAddDeparture(e, item)}
                                            className={`flex items-center py-1.5 px-2 text-sm font-medium text-center text-white rounded-md bg-successColor hover:bg-successColor_hover shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform duration-300`}>
                                        <BiPlus className={`mr-2 -ml-1 w-6 h-6`}/>
                                        Thêm mới
                                    </button>
                                    <span
                                        className={`bg-primaryColor text-white text-sm font-medium py-2 px-2 rounded-md shadow-md shadow-gray-300`}>
                                        Số lượng: {state?.pickUpPointList?.length}
                                    </span>
                                </div>
                                {
                                    state?.pickUpPointList.map((departureItem, index) => (
                                        <div key={index}
                                             className={`flex justify-between shadow-md rounded-md p-3 mb-4 last:mb-0`}>
                                            <div className={`group relative z-0 w-full mr-4`}>
                                                <input type="time"
                                                       name="time"
                                                       value={departureItem.time}
                                                       onChange={(e) => handleDepartureChange(e, item, index, 'time')}
                                                       className={`bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-medium`}
                                                       min="00:00" max="23:00" required/>
                                            </div>
                                            <div className={`group relative z-0 w-full mr-4`}>
                                                <select id={`departure`}
                                                        className="bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-medium"
                                                        value={departureItem.departure}
                                                        onChange={(e) => handleDepartureChange(e, item, index, 'locationId')}>
                                                    <option value={``}>
                                                        Địa điểm
                                                    </option>
                                                    {
                                                        locations.length > 0 && locations.map((item, index) => {
                                                            if (item?.locationParent?.id === state.scheduleDepartureId && item.status === true) {
                                                                return (
                                                                    <option value={item.id} key={index}>
                                                                        {item.name}
                                                                    </option>
                                                                )
                                                            }
                                                        })
                                                    }
                                                </select>
                                            </div>
                                            <div
                                                className={`w-[50px] group relative z-0 flex items-center justify-center text-dangerColor-default_2`}>
                                                <button onClick={(e) => handleDeleteDeparture(e, item, index)}>
                                                    <IoIosRemoveCircle className={`mr-2 -ml-1 w-6 h-6`}/>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                            <div className={`group relative z-0 w-full mb-6 shadow-xl rounded-xl p-4`}>
                                <div className={`flex justify-center items-center font-semibold text-lg`}>
                                    <h2>Điểm trả</h2>
                                </div>
                                <div className={`flex items-center justify-between my-4`}>
                                    <button type="button"
                                            onClick={(e) => handleAddDestination(e, item)}
                                            className={`flex items-center py-1.5 px-2 text-sm font-medium text-center text-white rounded-md bg-successColor hover:bg-successColor_hover shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform duration-300`}>
                                        <BiPlus className={`mr-2 -ml-1 w-6 h-6`}/>
                                        Thêm mới
                                    </button>
                                    <span
                                        className={`bg-primaryColor text-white text-sm font-medium py-2 px-2 rounded-md shadow-md shadow-gray-300`}>
                                        Số lượng: {state?.dropOffPointList?.length}
                                    </span>
                                </div>
                                {
                                    state?.dropOffPointList.map((destinationItem, index) => (
                                    <div key={index}
                                         className={`flex justify-between shadow-md rounded-md p-3 mb-4 last:mb-0`}>
                                        <div className={`group relative z-0 w-full mr-4`}>
                                            <input type="time"
                                                   name="time"
                                                   value={destinationItem.time}
                                                   onChange={(e) => handleDestinationChange(e, item, index, 'time')}
                                                   className={`bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-medium`}
                                                   min="00:00" max="23:00" required/>
                                        </div>
                                        <div className={`group relative z-0 w-full mr-4`}>
                                            <select id={`destination`}
                                                    className="bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-medium"
                                                    value={destinationItem.destination}
                                                    onChange={(e) => handleDestinationChange(e, item, index, 'locationId')}>
                                                <option value={``}>
                                                    Địa điểm
                                                </option>
                                                {
                                                    locations.length > 0 && locations.map((item, index) => {
                                                        if (item?.locationParent?.id === state.scheduleDestinationId && item.status === true) {
                                                            return (
                                                                <option value={item.id} key={index}>
                                                                    {item.name}
                                                                </option>
                                                            )
                                                        }
                                                    })
                                                }

                                            </select>
                                        </div>
                                        <div
                                            className={`w-[50px] group relative z-0 flex items-center justify-center text-dangerColor-default_2`}>
                                            <button onClick={(e) => handleDeleteDestination(e, item, index)}>
                                                <IoIosRemoveCircle className={`mr-2 -ml-1 w-6 h-6`}/>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`flex justify-end items-center my-4`}>
                    <button onClick={(e) => handleRemoveLayout(e, item)}
                            className=" duration-300 text-white bg-dangerColor-default_2 hover:bg-dangerColor-hover_2 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Xoá
                        lộ trình
                    </button>
                </div>

            </div>
        )
    }
    const getDaysBetween = (startDay, endDay) => {
        const daysList = [];
        if (startDay !== 0 && endDay !== 0) {
            let currentDay = +startDay;
            while (currentDay !== +endDay) {
                if (currentDay !== 1) {
                    daysList.push(currentDay);
                }
                currentDay = currentDay % 8 === 0 ? 1 : currentDay + 1;
            }
            daysList.push(+endDay);
        }

        return daysList;
    }
    const handleSaveAllSchedule = (e) => {
        e.preventDefault()
        const updatedListFormState = listFormState.map(form => {
            const minDepartureTime = Math.min(...form.departure.map(departure => getTimeInSeconds(departure.time)));
            const maxDestinationTime = Math.max(...form.destination.map(destination => getTimeInSeconds(destination.time)));
            const timeDifference = maxDestinationTime > minDepartureTime ? maxDestinationTime - minDepartureTime : 1440 - minDepartureTime + maxDestinationTime;

            return {
                ...form,
                timeDifference: timeDifference
            };
        });
        setCoachFormState((prev) => ({
            ...prev,
            distance: updatedListFormState,

        }))
        toast.success("Lưu lộ trình xe thành công")
    }
    const getTimeInSeconds = (time) => {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
    };
    const handleAddLayout = (e) => {
        e.preventDefault()
        setMaxItem(maxItem + 1);
        const newListFormState = [...listFormState, formState];
        setListFormState(newListFormState);
    }
    const handleRemoveLayout = (e, indexToRemove) => {
        e.preventDefault()
        setMaxItem(maxItem - 1)
        setListFormState(prevState => {
            return prevState.filter((_, index) => index !== indexToRemove);
        });
    }
    return (
        <div className={`overflow-x-auto`}>
            <div className={`inline-block min-w-full align-middle`}>
                {
                    listFormState.map((state, index) => {
                        return (
                            renderListCoachScheduleLayout(state, index)
                        )
                    })
                }
                <div className={`flex justify-end items-center my-4`}>
                    <button onClick={handleAddLayout}
                            className=" duration-300 text-white bg-primaryColor hover:bg-primaryColor_hover focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Thêm
                        lộ trình
                    </button>
                </div>
                <div className={`flex justify-end items-center`}>
                    <button onClick={handleSaveAllSchedule}
                            className=" duration-300 text-white bg-successColor hover:bg-successColor_hover focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                        Lưu danh sách
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CoachSchedule;
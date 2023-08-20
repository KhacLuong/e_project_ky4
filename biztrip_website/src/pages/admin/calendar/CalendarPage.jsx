import React, {useState} from 'react';
import {formatDate, Calendar} from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import vi from "@fullcalendar/core/locales/vi.js"
import {listBreadcrumb} from "../../../utils/data.jsx";
import Breadcrumb from "../../../components/Breadcrumb.jsx";

let eventGuid = 0;
const TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
];

export function createEventId() {
    return String(eventGuid++);
}

const CalendarPage = () => {
    const [weekendsVisible, setWeekendsVisible] = useState(true)
    const [currentEvents, setCurrentEvents] = useState([])

    // const handleDateSelect = (selectInfo) => {
    //     console.log(selectInfo)
    //     let title = prompt('Please enter a new title for your event')
    //     let calendarApi = selectInfo.view.calendar
    //
    //     calendarApi.unselect() // clear date selection
    //
    //     if (title) {
    //         calendarApi.addEvent({
    //             id: createEventId(),
    //             title,
    //             start: selectInfo.startStr,
    //             end: selectInfo.endStr,
    //             allDay: selectInfo.allDay
    //         })
    //     }
    // }

    const handleWeekendsToggle = () => {
        setWeekendsVisible(!weekendsVisible)
    }
    const renderEventContent = (eventInfo) => {
        return (
            <>
                <b>{eventInfo.timeText}</b>
                <i>{eventInfo.event.title}</i>
            </>
        )
    }

    const renderSidebarEvent = (event) => {
        return (
            <li key={event.id}>
                <b>{formatDate(event.start, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
                <i>{event.title}</i>
            </li>
        )
    }
    const handleEventClick = (clickInfo) => {
        if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
            clickInfo.event.remove()
        }
    }
    const handleEvents = (events) => {
        setCurrentEvents(events)
    }

    const handleDateClick = (info) => {
        console.log(info)
        // alert('Clicked on: ' + info.dateStr);
        // alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
        // alert('Current view: ' + info.view.type);
    }
    return (
        <>
            <div
                className={`block justify-between items-center p-4 mx-4 my-4 bg-white rounded-2xl shadow-xl shadow-gray-200 lg:p-5 sm:flex`}
                data-aos="fade-right"
                data-aos-delay="100">
                <div className={`w-full`}>
                    <div className={`my-2 -mb-4`}>
                        <Breadcrumb dataBreadcrumb={listBreadcrumb("Quản lý lịch trình")}/>
                        <h1 className={`text-xl font-semibold text-gray-900 sm:text-2xl`}></h1>
                    </div>
                </div>
            </div>
            <div  data-aos="fade-right"
                  data-aos-delay="500">
                <div className={`flex flex-col my-6 mx-4 rounded-2xl shadow-lg shadow-gray-200`}>
                    <div className={`overflow-x-auto rounded-2xl`} >
                        <div className={`inline-block min-w-full align-middle`}>
                            <div className={`overflow-hidden shadow-lg`}>
                                <div className={`w-full text-sm text-left text-gray-500`}>
                                    <FullCalendar
                                        plugins={[timeGridPlugin, interactionPlugin]}
                                        initialView="timeGridWeek"
                                        locale={vi}
                                        editable={true}
                                        selectable={true}
                                        selectMirror={true}
                                        dayMaxEvents={true}
                                        events={INITIAL_EVENTS}
                                        headerToolbar={{
                                            right: 'prev,next today',
                                            center: 'title',
                                            left: 'timeGridWeek,timeGridDay'
                                        }}
                                        dateClick={handleDateClick}
                                        dayCellClassNames={`full__calendar-day`}
                                        eventContent={renderEventContent}
                                        eventClick={handleEventClick}
                                        eventsSet={handleEvents}

                                        /* you can update a remote database when these fire:
                                           eventAdd={function(){}}
                                           eventChange={function(){}}
                                           eventRemove={function(){}}
                                         */
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CalendarPage;
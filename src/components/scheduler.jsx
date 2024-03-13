import React from 'react';
import Scheduler, { SchedulerData, ViewTypes } from 'react-big-scheduler';
import withDndContext from './withDndContext';
import 'react-big-scheduler/lib/css/style.css';

const SchedulerComponent = ({ schedulerData }) => {
  return (
    <div>
      <h1>React Big Scheduler Example</h1>
      <Scheduler schedulerData={schedulerData} />
    </div>
  );
};

// Wrap the component with DragDropContext
export default withDndContext(SchedulerComponent);
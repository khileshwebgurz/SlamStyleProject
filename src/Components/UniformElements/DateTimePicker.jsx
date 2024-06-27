import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import enGB from 'date-fns/locale/en-GB';

registerLocale('en-GB', enGB);
setDefaultLocale('en-GB');

const DateTimePicker = () => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className="form-group">
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        dateFormat="yyyy/MM/dd HH:mm"
        minDate={new Date()}
        placeholderText="Preferred time to call"
        locale="en-GB"
      />
    </div>
  );
};

export default DateTimePicker;

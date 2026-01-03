'use client';
import { useState } from 'react';
import { Input, TextArea, Select, Checkbox, RadioGroup, Radio, Toggle, Slider, ComboBox, DatePicker, } from 'tuimorphic';
// ============================================================================
// Input Examples
// ============================================================================
export function InputBasic() {
    return <Input />;
}
export function InputWithLabel() {
    return <Input label="Username"/>;
}
export function InputPassword() {
    return <Input type="password" label="Password"/>;
}
export function InputPlaceholder() {
    return <Input placeholder="Enter your email..."/>;
}
export function InputDisabled() {
    return <Input label="Disabled Input" disabled defaultValue="Cannot edit"/>;
}
export function InputInteractive() {
    const [value, setValue] = useState('');
    return (<div className="space-y-2">
      <Input label="Interactive Input" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Type something..."/>
      <div className="text-sm">Current value: {value || '(empty)'}</div>
    </div>);
}
// ============================================================================
// TextArea Examples
// ============================================================================
export function TextAreaBasic() {
    return <TextArea />;
}
export function TextAreaWithLabel() {
    return <TextArea label="Description"/>;
}
export function TextAreaRows() {
    return <TextArea label="Message" rows={6}/>;
}
export function TextAreaPlaceholder() {
    return <TextArea placeholder="Write your message here..." rows={4}/>;
}
// ============================================================================
// Select Examples
// ============================================================================
const countryOptions = [
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
    { value: 'au', label: 'Australia' },
    { value: 'de', label: 'Germany' },
];
export function SelectBasic() {
    return (<Select placeholder="Select a country" options={countryOptions}/>);
}
export function SelectWithLabel() {
    return (<Select label="Country" placeholder="Select a country" options={countryOptions}/>);
}
export function SelectDisabled() {
    return (<Select label="Country (Disabled)" placeholder="Select a country" options={countryOptions} disabled/>);
}
export function SelectControlled() {
    const [value, setValue] = useState('');
    return (<div className="space-y-2">
      <Select label="Favorite Country" placeholder="Select a country" options={countryOptions} value={value} onValueChange={setValue}/>
      <div className="text-sm">Selected: {value || '(none)'}</div>
    </div>);
}
// ============================================================================
// Checkbox Examples
// ============================================================================
export function CheckboxBasic() {
    return <Checkbox />;
}
export function CheckboxWithLabel() {
    return <Checkbox label="Accept terms and conditions"/>;
}
export function CheckboxGroup() {
    return (<div className="space-y-2">
      <Checkbox label="Option A"/>
      <Checkbox label="Option B"/>
      <Checkbox label="Option C"/>
    </div>);
}
export function CheckboxDisabled() {
    return (<div className="space-y-2">
      <Checkbox label="Disabled unchecked" disabled/>
      <Checkbox label="Disabled checked" disabled checked/>
    </div>);
}
export function CheckboxControlled() {
    const [checked, setChecked] = useState(false);
    return (<div className="space-y-2">
      <Checkbox label="Controlled checkbox" checked={checked} onCheckedChange={setChecked}/>
      <div className="text-sm">State: {checked ? 'Checked' : 'Unchecked'}</div>
    </div>);
}
// ============================================================================
// Radio Examples
// ============================================================================
export function RadioBasic() {
    return (<RadioGroup defaultValue="a">
      <Radio value="a" label="Option A"/>
      <Radio value="b" label="Option B"/>
      <Radio value="c" label="Option C"/>
    </RadioGroup>);
}
export function RadioHorizontal() {
    return (<RadioGroup defaultValue="small" className="flex gap-4">
      <Radio value="small" label="Small"/>
      <Radio value="medium" label="Medium"/>
      <Radio value="large" label="Large"/>
    </RadioGroup>);
}
export function RadioDisabled() {
    return (<RadioGroup defaultValue="enabled">
      <Radio value="enabled" label="Enabled option"/>
      <Radio value="disabled" label="Disabled option" disabled/>
      <Radio value="another" label="Another enabled"/>
    </RadioGroup>);
}
export function RadioControlled() {
    const [value, setValue] = useState('option1');
    const handleValueChange = (newValue) => {
        if (typeof newValue === 'string') {
            setValue(newValue);
        }
    };
    return (<div className="space-y-2">
      <RadioGroup value={value} onValueChange={handleValueChange}>
        <Radio value="option1" label="First option"/>
        <Radio value="option2" label="Second option"/>
        <Radio value="option3" label="Third option"/>
      </RadioGroup>
      <div className="text-sm">Selected: {value}</div>
    </div>);
}
// ============================================================================
// Toggle Examples
// ============================================================================
export function ToggleBasic() {
    return <Toggle />;
}
export function ToggleWithLabel() {
    return <Toggle label="Enable notifications"/>;
}
export function ToggleDisabled() {
    return (<div className="space-y-2">
      <Toggle label="Disabled off" disabled/>
      <Toggle label="Disabled on" disabled checked/>
    </div>);
}
export function ToggleControlled() {
    const [enabled, setEnabled] = useState(false);
    return (<div className="space-y-2">
      <Toggle label="Dark mode" checked={enabled} onCheckedChange={setEnabled}/>
      <div className="text-sm">Status: {enabled ? 'Enabled' : 'Disabled'}</div>
    </div>);
}
// ============================================================================
// Slider Examples
// ============================================================================
export function SliderBasic() {
    return <Slider />;
}
export function SliderWithLabel() {
    return <Slider label="Volume"/>;
}
export function SliderShowValue() {
    return <Slider label="Brightness" showValue/>;
}
export function SliderRange() {
    return <Slider label="Temperature" min={0} max={50} defaultValue={[25]} showValue/>;
}
export function SliderControlled() {
    const [value, setValue] = useState([50]);
    const handleValueChange = (newValue) => {
        if (typeof newValue === 'number') {
            setValue([newValue]);
        }
        else {
            setValue([...newValue]);
        }
    };
    return (<div className="space-y-2">
      <Slider label="Progress" value={value} onValueChange={handleValueChange} showValue/>
      <div className="text-sm">Value: {value[0]}</div>
    </div>);
}
// ============================================================================
// ComboBox Examples
// ============================================================================
const comboBoxOptions = [
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
    { value: 'au', label: 'Australia' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' },
    { value: 'jp', label: 'Japan' },
];
const comboBoxOptionsWithDesc = [
    { value: 'react', label: 'React', description: 'A JavaScript library for building UIs' },
    { value: 'vue', label: 'Vue', description: 'Progressive JavaScript framework' },
    { value: 'angular', label: 'Angular', description: 'Platform for building web apps' },
    { value: 'svelte', label: 'Svelte', description: 'Cybernetically enhanced web apps' },
];
export function ComboBoxBasic() {
    return (<ComboBox placeholder="Search countries..." options={comboBoxOptions}/>);
}
export function ComboBoxWithLabel() {
    return (<ComboBox label="Country" placeholder="Search countries..." options={comboBoxOptions}/>);
}
export function ComboBoxWithDescriptions() {
    return (<ComboBox label="Framework" placeholder="Search frameworks..." options={comboBoxOptionsWithDesc}/>);
}
export function ComboBoxStates() {
    return (<div className="space-y-4">
      <ComboBox label="Enabled" placeholder="Search..." options={comboBoxOptions}/>
      <ComboBox label="Disabled" placeholder="Search..." options={comboBoxOptions} disabled/>
    </div>);
}
export function ComboBoxDefaultValue() {
    return (<ComboBox label="Country" defaultValue="United States" options={comboBoxOptions}/>);
}
export function ComboBoxControlled() {
    const [value, setValue] = useState('');
    return (<div className="space-y-2">
      <ComboBox label="Country" placeholder="Search countries..." options={comboBoxOptions} value={value} onValueChange={setValue}/>
      <div className="text-sm">Value: {value || '(empty)'}</div>
    </div>);
}
export function ComboBoxInteractive() {
    const [country, setCountry] = useState('');
    const [framework, setFramework] = useState('');
    return (<div className="space-y-4">
      <ComboBox label="Country" placeholder="Search countries..." options={comboBoxOptions} value={country} onValueChange={setCountry}/>
      <ComboBox label="Framework" placeholder="Search frameworks..." options={comboBoxOptionsWithDesc} value={framework} onValueChange={setFramework}/>
      <div className="text-sm">
        <p>Country: {country || '(none)'}</p>
        <p>Framework: {framework || '(none)'}</p>
      </div>
    </div>);
}
export function ComboBoxLongList() {
    const longList = Array.from({ length: 50 }, (_, i) => ({
        value: `item-${i}`,
        label: `Item ${i + 1}`,
    }));
    return (<ComboBox label="Long List" placeholder="Search items..." options={longList}/>);
}
// ============================================================================
// DatePicker Examples
// ============================================================================
export function DatePickerBasic() {
    return <DatePicker />;
}
export function DatePickerWithLabel() {
    return <DatePicker label="Select Date"/>;
}
export function DatePickerDefaultValue() {
    return <DatePicker label="Birth Date" defaultValue={new Date(1990, 0, 15)}/>;
}
export function DatePickerMinMax() {
    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
    return (<div className="space-y-4">
      <DatePicker label="Future dates only" minDate={today}/>
      <DatePicker label="Past dates only" maxDate={today}/>
      <DatePicker label="Next 30 days" minDate={today} maxDate={nextMonth}/>
    </div>);
}
export function DatePickerControlled() {
    const [date, setDate] = useState();
    return (<div className="space-y-2">
      <DatePicker label="Event Date" value={date} onValueChange={setDate}/>
      <div className="text-sm">
        Selected: {date ? date.toLocaleDateString() : '(none)'}
      </div>
    </div>);
}
export function DatePickerInteractive() {
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    return (<div className="space-y-4">
      <DatePicker label="Start Date" value={startDate} onValueChange={setStartDate}/>
      <DatePicker label="End Date" value={endDate} onValueChange={setEndDate} minDate={startDate}/>
      <div className="text-sm">
        <p>Start: {startDate ? startDate.toLocaleDateString() : '(none)'}</p>
        <p>End: {endDate ? endDate.toLocaleDateString() : '(none)'}</p>
      </div>
    </div>);
}
export function DatePickerBooking() {
    const [checkIn, setCheckIn] = useState();
    const [checkOut, setCheckOut] = useState();
    const today = new Date();
    return (<div className="space-y-4">
      <DatePicker label="Check-in" value={checkIn} onValueChange={(date) => {
            setCheckIn(date);
            if (checkOut && date > checkOut) {
                setCheckOut(undefined);
            }
        }} minDate={today}/>
      <DatePicker label="Check-out" value={checkOut} onValueChange={setCheckOut} minDate={checkIn || today}/>
      <div className="text-sm">
        <p>Check-in: {checkIn ? checkIn.toLocaleDateString() : '(none)'}</p>
        <p>Check-out: {checkOut ? checkOut.toLocaleDateString() : '(none)'}</p>
      </div>
    </div>);
}

import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  SectionList,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../Redux/store/store';
import {useState} from 'react';
import {
  addItem,
  removeItem,
  updateItem,
} from '../Redux/slices/notificationSlice';
import {Calendar} from 'react-native-calendars';
import {RadioButton} from 'react-native-paper';

const ForamtDate = () => {
  const date = new Date();
  const fullYear = String(date.getFullYear());
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${fullYear}-${month}-${day}`;
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'low':
      return '#4CAF50';
    case 'medium':
      return '#FFEB3B';
    case 'high':
      return '#F44336';
    default:
      return '#000000';
  }
};

const Notification: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {items} = useSelector((state: RootState) => state.notification);
  const [inputValue, setInputValue] = useState<string>('');
  const [selectedDay, setSelectedDay] = useState<string>(ForamtDate());
  const [isCalendar, setIsCalendar] = useState<boolean>(false);
  const [checked, setChecked] = useState<string>('low');
  const [error, setError] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editItemId, setEditItemId] = useState<number | null>(null);

  const SumbitInput = () => {
    if (inputValue.trim() !== '') {
      if (isEdit && editItemId) {
        dispatch(
          updateItem({
            id: editItemId,
            value: inputValue,
            date: selectedDay,
            priority: checked,
          }),
        );
        setIsEdit(false);
        setEditItemId(null);
      } else {
        dispatch(
          addItem({value: inputValue, date: selectedDay, priority: checked}),
        );
      }
      Keyboard.dismiss();
      setInputValue('');
      setSelectedDay(ForamtDate());
      setChecked('low');
      setError(false);
    } else {
      setError(true);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const groupItemsByDate = (items: any[]) => {
    const groupedItems = items.reduce((acc: any, item: any) => {
      const date = item.date;
      if (!acc[date]) {
        acc[date] = {title: date, data: []};
      }
      acc[date].data.push(item);
      return acc;
    }, {});
    return Object.values(groupedItems);
  };

  const sections = groupItemsByDate(items);

  console.log(sections);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={inputValue}
        onChangeText={text => setInputValue(text)}
        onSubmitEditing={SumbitInput}
        placeholder={isEdit ? 'Edit notification' : 'Enter notification'}
      />
      {error && <Text style={styles.error}>Write a notification</Text>}
      <View style={styles.radioGroup}>
        <View style={styles.radioButtonContainer}>
          <RadioButton.Android
            value="low"
            status={checked === 'low' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('low')}
          />
          <Text>Low</Text>
        </View>
        <View style={styles.radioButtonContainer}>
          <RadioButton.Android
            value="medium"
            status={checked === 'medium' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('medium')}
          />
          <Text>Medium</Text>
        </View>
        <View style={styles.radioButtonContainer}>
          <RadioButton.Android
            value="high"
            status={checked === 'high' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('high')}
          />
          <Text>High</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => setIsCalendar(!isCalendar)}
        style={styles.calendarButton}>
        <Text style={styles.buttonTextColor}>Choose a date</Text>
      </TouchableOpacity>
      {isCalendar && (
        <Calendar
          style={styles.calendar}
          minDate={ForamtDate()}
          onDayPress={day => {
            setSelectedDay(day.dateString);
          }}
          markedDates={{
            [selectedDay]: {
              selected: true,
              marked: true,
              selectedColor: '#00adf5',
            },
          }}
        />
      )}

      <TouchableOpacity style={styles.calendarButton} onPress={SumbitInput}>
        <Text style={styles.buttonTextColor}>
          {isEdit ? 'Update notification' : 'Add a notification'}
        </Text>
      </TouchableOpacity>
      <SectionList
        contentContainerStyle={styles.sectionListContainer}
        sections={sections}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View
            style={[
              styles.itemNotification,
              {backgroundColor: getPriorityColor(item.priority)},
            ]}>
            <Text>{item.value}</Text>
            <Text>{item.priority}</Text>
            <Text style={styles.dateText}>date: {item.date}</Text>
            <View style={styles.editRemove}>
              <TouchableOpacity
                onPress={() => {
                  setIsEdit(true);
                  setEditItemId(item.id);
                  setInputValue(item.value);
                  setSelectedDay(item.date);
                  setChecked(item.priority);
                }}
                style={styles.removeButton}>
                <Text>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => dispatch(removeItem({id: item.id}))}
                style={styles.removeButton}>
                <Text>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.sectionHeaderText}>{title}</Text>
        )}
      />
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
  },
  input: {
    width: '80%',
    borderColor: 'black',
    borderWidth: 2,
    borderStyle: 'solid',
    padding: 5,
    borderRadius: 100,
    minHeight: 30,
    maxHeight: 50,
  },
  calendar: {
    width: 300,
    marginVertical: 10,
  },
  radioGroup: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarButton: {
    width: '80%',
    minHeight: 30,
    maxHeight: 50,
    marginTop: 10,
    backgroundColor: '#00adf5',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9999,
  },
  buttonTextColor: {
    color: 'white',
  },
  itemNotification: {
    width: 300,
    height: 80,
    marginTop: 10,
    padding: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
  },
  error: {
    width: '75%',
    marginTop: 5,
    color: 'red',
  },
  removeButton: {
    alignSelf: 'flex-end',
    height: 80,
    marginLeft: 10,
  },
  dateText: {
    fontSize: 12,
  },
  sectionListContainer: {
    alignItems: 'center',
  },
  sectionHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  editRemove: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

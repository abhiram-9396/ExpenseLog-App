import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ManageExpenses from './screens/ManageExpense';
import AllExpenses from './screens/AllExpenses';
import RecentExpenses from './screens/RecentExpense';
import { GlobalStyles } from './constants/styles';
import {Ionicons} from '@expo/vector-icons';
import IconButton from './components/UI/IconButton';
import ExpensesContextProvider from './store/expenses-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import DeveloperInfoScreen from './screens/DeveloperInfo';
import { Colors } from './constants/styles';
import AuthContextProvider, { AuthContext } from './store/auth-context';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useContext, useEffect} from 'react';
import * as Notifications from 'expo-notifications';
import LoadingOverlay from './components/UI/LoadingOverlay';
import { deleteTable, init } from './util/database';


const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowAlert: true,
    };
  }
});

function ExpensesOverview()
{
  const authCtx = useContext(AuthContext);
  return(
    <BottomTabs.Navigator 
      screenOptions={ ({ navigation }) => ({
      headerStyle:{ backgroundColor: GlobalStyles.colors.primary500 },
      headerTintColor:'white',
      tabBarStyle:{ backgroundColor: GlobalStyles.colors.primary500 },
      tabBarActiveTintColor : GlobalStyles.colors.accent500,
      headerRight: ({ tintcolor }) => (
        <IconButton icon="add" size={24} color="white" onPress={()=>{
          navigation.navigate('Manage Expenses');
          }}
        />
      ),
      headerLeft: ({ tintcolor }) => (
        <IconButton icon="exit" size={24} 
        color="white" 
        onPress={authCtx.logout}
        />
      ),
    })}>

      <BottomTabs.Screen name='Recent Expenses' component={RecentExpenses} 
      options={{
        tabBarLabel:'Recent',
        tabBarIcon: ({color,size}) => (
          <Ionicons size={size} color={color} name='hourglass' />
        ),
      }}
      />
      <BottomTabs.Screen name='All Expenses' component={AllExpenses}
      options={{
        tabBarLabel:'All Expenses',
        tabBarIcon: ({color,size}) => (
          <Ionicons size={size} color={color} name='calendar' />
        ),
      }}
      />
      <BottomTabs.Screen name='Info' component={DeveloperInfoScreen}
      options={{
        tabBarLabel:'App info',
        tabBarIcon: ({color,size}) => (
          <Ionicons size={size} color={color} name='information-circle-sharp' />
        ),
      }}
      />

    </BottomTabs.Navigator>
  );
}


function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);
  return (
    <>
      <Stack.Navigator screenOptions={
        {
          headerStyle:{ backgroundColor: GlobalStyles.colors.primary500 },
          headerTintColor:'white',
        }
      }>
        <Stack.Screen 
          name='Expenses Overview' 
          component={ExpensesOverview}
          options={{
            headerShown:false,
          }}
        />
        <Stack.Screen name="Manage Expenses" component={ManageExpenses} 
        options={{
          presentation:'modal', //its the setting to the popup effect in the screen.
        }}/>

      </Stack.Navigator>
    </>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);
  return (
      <ExpensesContextProvider>
        <NavigationContainer>
          {!authCtx.isAuthenticated && <AuthStack />}
          {authCtx.isAuthenticated && <AuthenticatedStack />}
        </NavigationContainer>
      </ExpensesContextProvider>
  );
}

function Root() { //this is to save the auth token in the device and auto login the user if auth token is found.
  const [isTryingLogin, setIsTryingLogin] = useState(true);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem('token');

      if (storedToken) {
        authCtx.authenticate(storedToken);
      }

      setIsTryingLogin(false);
    }

    fetchToken();
  }, []);

  if (isTryingLogin) {
    return <LoadingOverlay/>;
  }
  return <Navigation />;
}



export default function App() {

  const [dbInitialized, setDbInitialized] = useState(false);

  // useEffect(() => {
    
  // }, []);

  

  const authCtx = useContext(AuthContext);
  useEffect(() => {

    async function configurePushNotifications()
    {

      init()
      .then(() => {
        setDbInitialized(true);
      })
      .catch((err) => {
        console.log(err);
      });

      // deleteTable()
      // .then(() => {
      //   setDbInitialized(true);
      // })
      // .catch((err) => {
      //   console.log(err);
      // });

      if(!dbInitialized)
      {
        return <LoadingOverlay/>;
      }

      const { status } = await Notifications.getPermissionsAsync();
      let finalStatus = status;

      if(finalStatus !== 'granted')
      {
        const { status } = await Notifications.requestPermissionsAsync(); //requesting the permission to send notifications
        finalStatus = status;
      }

      if(finalStatus !== 'granted')
      {
        Alert.alert('Permission required', 'Push notifications requires your permission'); //if user denies the permission then this alert will be displayed.
        return;
      }
      
      const pushTokenData = await Notifications.getExpoPushTokenAsync(); //by using this function, PushTokendata is generated for every device which contains a unique expo pushToken which never changes.
      console.log(pushTokenData);
      // console.log(pushTokenData.data);

      if(Platform.OS === 'android')
      {
        Notifications.setNotificationChannelAsync('default',{
          name: 'default',
          importance: Notifications.AndroidImportance.DEFAULT
        });
      }
    }

    configurePushNotifications();
  },[]);
  

  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        {/* <Navigation /> */}
        <Root />
      </AuthContextProvider>
    </>
  );
}


const styles = StyleSheet.create({
  pressed:
{
  opacity:0.25,
},
});


<p align="left">
    <img src="./www/logo_neosurance.png">
</p>

<br>

<p><b><a href="https://github.com/neosurance/cordova-nsr-plugin.git">NSR Ionic Cordova Plugin</a></b></p>

> With Neosurance, Insurers and Communities can offer the right insurance at the right time, creating great customer experiences that drive the adoption of mobile insurance and close the protection gap.

<br>

<!--img width="60%" align="right" hspace="19" vspace="12" src="https://storage.googleapis.com/material-design/publish/material_v_12/assets/0BwJzNNZmsTcKZy1YYTV3VWQzVUE/notifications-behavior-03-drawer.png"></img-->
<!--img width="60%" align="right" hspace="19" vspace="12" src="https://storage.googleapis.com/material-design/publish/material_v_12/assets/0Bzhp5Z4wHba3S1JWc3NkTVpjVk0/notifications-guidelines-03-optin.png"></img-->

### Supported platforms

- Android 4.4+
- iOS 10+

## Basics

The plugin creates the object `Neosurance` and is accessible after *deviceready* has been fired.

```js
Neosurance.NSR_Setup()
```

The plugin allows hybrid cordova applications to use Neosurance SDK.

```js
Neosurance.NSR_RegisterUser({
  code:"mario@rossi.com",
  email: "mario@rossi.com",
  firstname: "Mario",
  lastname: "Rossi",
  country:"Italia",
  fiscalCode: "RSSMRA85T01F205P",
  address: "Via Canova 12",
  city: "Milano",
  stateProvince: "MI",
  locals:{
    email: "mario@rossi.com",
    firstname: "Mario",
    lastname: "Rossi",
    fiscalCode: "RSSMRA85T01F205P",
    address: "Via Canova 12",
    city: "Milano",
    stateProvince: "MI",
    pushToken : "fake-push"
  }
}, successCallback, failureCallback);
```

## NSREventCruncher

A notification will be detected by the NSR Event Cruncher:

```js
Neosurance.nsr_event_cruncher.EVC.init(successCallback, failureCallback);
```

## Installation

The plugin can be installed via [Cordova-CLI][CLI] and is publicly available on github.

Execute from the projects root folder:

    $ ionic cordova plugin add https://github.com/neosurance/cordova-nsr-plugin.git

Or install from local source:

    $ ionic cordova plugin add <path> 


## Android: After Installation

1. Inside your **AndroidManifest.xml** be sure to have the following permissions:

	```xml
	<uses-permission android:name="android.permission.INTERNET" />
	<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
	<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
	<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
	<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
	<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
	<uses-permission android:name="android.permission.CAMERA" />
	<uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" />
	<uses-permission android:name="com.google.android.gms.permission.ACTIVITY_RECOGNITION" />
	```
2. Inside your **AndroidManifest.xml** be sure to have the following activities:

	```xml
	<activity android:configChanges="orientation|screenSize|keyboardHidden" 
              android:name="eu.neosurance.sdk_ext.NSRActivity" 
              android:screenOrientation="portrait" 
              android:theme="@style/Theme.AppCompat.Light.NoActionBar">
         <intent-filter>
                 <action android:name="android.intent.action.MAIN" />
                 <category android:name="android.intent.category.LAUNCHER" />
         </intent-filter>
    </activity>
   
    <activity android:configChanges="orientation|screenSize|keyboardHidden" 
              android:name="eu.neosurance.sdk.NSRActivityWebView" 
              android:screenOrientation="portrait" 
              android:theme="@style/Theme.AppCompat.Light.NoActionBar" />
	```

3. Inside your **AndroidManifest.xml** be sure to have the following receivers:
   
    ```xml
   	<receiver android:name="eu.neosurance.sdk.NSRBootReceiver">
   	    <intent-filter>
   	        <action android:name="android.intent.action.BOOT_COMPLETED" />
   	    </intent-filter>
   	</receiver>
   	
   	<receiver android:name="eu.neosurance.sdk.NSRFenceCallback" />
   	
   	<receiver android:name="eu.neosurance.sdk.NSRActivityCallback" />
   	
   	<receiver android:name="eu.neosurance.sdk.NSRDelayedPush" />
   	
   	<receiver android:name="eu.neosurance.sdk.NSRBackground" />
   	```
	
4. Inside your **AndroidManifest.xml** be sure to have the following service:
   
    ```xml
   	<service android:exported="false" android:name="eu.neosurance.sdk.NSRForeground" />
   	```

5. Inside your **AndroidManifest.xml** be sure to have the following provider:
      
   ```xml
    <provider android:authorities="${applicationId}.provider" 
              android:exported="false" 
              android:grantUriPermissions="true" 
              android:name="android.support.v4.content.FileProvider">
        <meta-data android:name="android.support.FILE_PROVIDER_PATHS" android:resource="@xml/file_paths" />
    </provider>
    ```
	
 6. Inside your **platforms/android/app/build.gradle** replace your statement **'dependencies'** and rebuild project:
	
	```
	/*
     * WARNING: Cordova Lib and platform scripts do management inside of this code here,
     * if you are adding the dependencies manually, do so outside the comments, otherwise
     * the Cordova tools will overwrite them
     */
     
     dependencies {
             implementation fileTree(dir: 'libs', include: '*.jar')
             // SUB-PROJECT DEPENDENCIES START
             implementation(project(path: ":CordovaLib"))
            ...
     }
	```
	with
	
	```
	android {
        compileSdkVersion 28
    
        defaultConfig {
            minSdkVersion 19
            targetSdkVersion 28
            versionCode 3
            versionName "3.0.0"
            multiDexEnabled true
        }
    }
    
    dependencies {
        implementation fileTree(dir: 'libs', include: '*.jar')
        // SUB-PROJECT DEPENDENCIES START
        implementation(project(path: ":CordovaLib"))
        implementation "com.android.support:support-annotations:27.+"
        implementation 'com.android.support:appcompat-v7:28.0.0'
        implementation 'com.android.support:support-v4:28.0.0'
        implementation 'com.google.android.gms:play-services-location:15.0.1'
        // SUB-PROJECT DEPENDENCIES END
    }
	```

7. Inside your android app **java/** be sure to have the following Packages with several files:
         
      ```
       eu.neosurance.
            - cordova 
                (NSRCordovaInterface.java)
            
            - sdk
                (NSR.java)
                (...)
            
            - sdk_ext
                (WFDelegate.java)
                (...)
            
            - utils
                (NSRUtils.java)
                (...)
       ```

## iOS: After Installation

1. Inside your file.plist be sure to have the following permissions:

	```xml
	NSRIonic_v4-Info.plist

    - Privacy - Location Always and When In Use Usage Description 	[Always and when in use...]
    - Privacy - Location Always Usage Description					[Always...]
    - Privacy - Location When In Use Usage Description				[When in use...]
    - Privacy - Motion Usage Description							[Motion…]
	```
	
2. Inside your Podfile be sure to have the following:

	```
	target 'NSRIonic_v4TEST' do
	source 'https://github.com/CocoaPods/Specs.git'
	platform :ios, '9.0'
	pod 'AFNetworking', '~> 3.0'
	end
	```
	then use this command from your terminal in the Podfile and Xcode project directory:
	```
    pod install
    ```

3. Inside your XCode Capabilities be sure to have the following:

	```xml
	Background Modes ON

    - Location updates
    - Bacground fetch
    - Remote notifications
	```

## Usage

1. ### Setup
	Earlier in your Ionic Cordova application startup flow using
	
	Android
	
    ```js
    Neosurance.NSR_Setup(null, successCallback, failureCallback);
    ```
    
    iOS
    
    ```js
    var params = {
       "code":"code",
       "base_url":"https://base_url/api/v1.0/",
       "secret_key": "secret_key",
       "dev_mode": true
    };

    Neosurance.NSR_Setup(params, successCallback, failureCallback);
   ```
   
2. ### Init eventCruncher
    
    ```js
    Neosurance.nsr_event_cruncher.EVC.init(successCallback, failureCallback);
    ```   
        
3. ### User Registration    
    ```js
    Neosurance.NSR_RegisterUser({
     code:"mario@rossi.com",
     email: "mario@rossi.com",
     firstname: "Mario",
     lastname: "Rossi",
     country:"Italia",
     fiscalCode: "RSSMRA85T01F205P",
     address: "Via Canova 12",
     city: "Milano",
     stateProvince: "MI",
     locals:{
       email: "mario@rossi.com",
       firstname: "Mario",
       lastname: "Rossi",
       fiscalCode: "RSSMRA85T01F205P",
       address: "Via Canova 12",
       city: "Milano",
       stateProvince: "MI",
       pushToken : "fake-push"
     }
   }, successCallback, failureCallback);
    ```
    
4. ### Set Login Callbacks
    
    ```js
    Neosurance.NSR_SetLoginCallback(null, successCallback, failureCallback);
   ```

5. ### Send Trial Event   

    ```js
    scriptJS.sendEvent({event:'trg1',payload:{fake:1}}, successCallback, failureCallback);
     ```
     
6. ### If Login was ok   
  
     ```js
     Neosurance.NSR_LoginExecuted(null, successCallback, failureCallback);
     ```

7. ### Show Payments List   
  
     ```js
     Neosurance.NSR_ShowApp(null, successCallback, failureCallback);
     ```
     
8. ### Set Payment Callbacks 

     ```js
     Neosurance.NSR_AppPayment(null, successCallback, failureCallback);
     ```
     
7. ### If Payment was ok
     
     ```js
     Neosurance.NSR_PaymentExecuted(null, successCallback, failureCallback);
     ```
     
8. ### For further information see NSR SDK Docs
	
	<p align="left"><b><a href="https://github.com/neosurance/NeosuranceSDK_v3_android">NeosuranceSDK_v3_android</a></b></p>
	
	...It's *mandatory* that your **securityDelegate** implements the **default constructor** and must be excluded from any obfuscation (ProGuard).  
	Then use the ***setSecurityDelegate*** method...

## Author

info@neosurance.eu

## License

NeosuranceSDK is available under the MIT license. See the LICENSE file for more info.

[cordova]: https://cordova.apache.org
[CLI]: http://cordova.apache.org/docs/en/edge/guide_cli_index.md.html#The%20Command-line%20Interface
[apache2_license]: http://opensource.org/licenses/Apache-2.0

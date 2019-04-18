package eu.neosurance.cordova;

import android.app.Activity;
import android.content.Context;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaArgs;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.json.JSONException;
import org.json.JSONObject;


//**********
import android.content.BroadcastReceiver;
import android.content.Intent;
import android.content.IntentFilter;
import android.net.Uri;
import android.os.Bundle;
import android.support.v4.content.LocalBroadcastManager;
//**********

import java.io.IOException;
import java.util.Properties;

import eu.neosurance.sdk.NSREventWebView;
import eu.neosurance.sdk_ext.NSRActivity;
import eu.neosurance.sdk_ext.WFDelegate;
import eu.neosurance.sdk_ext.WFReceiver;
import eu.neosurance.sdk.NSR;
import eu.neosurance.sdk.NSRSettings;
import eu.neosurance.sdk.NSRUser;
import eu.neosurance.utils.NSRUtils;

public class NSRCordovaInterface extends CordovaPlugin {

    public static final String TAG = NSRCordovaInterface.class.getSimpleName();

    public static String ACTION_SETUP = "nsr_setup";
    public static String ACTION_REGISTER_USER = "nsr_register_user";
    public static String ACTION_APP_LOGIN = "nsr_app_login";
    public static String ACTION_APP_PAYMENT = "nsr_app_payment";
    public static String ACTION_SEND_EVENT = "nsr_send_event";
    public static String ACTION_SEND_ACTION = "nsr_send_action";
    public static String ACTION_POST_MESSAGE  = "nsr_post_message";
    public static String ACTION_INIT_NSR = "init_nsr";
    public static String ACTION_START_SDK_MAIN_ACT = "start_sdk_main_activity";


    //public static String ACTION_ONSENTDATA = "onSentData";
    //public static CallbackContext onSendCallback;

    public static CallbackContext NSR_StartSDKActivityCallback = null;
    public static CallbackContext NSR_InitCallback = null;

    public static CallbackContext NSR_SetupCallback = null;
    public static CallbackContext NSR_RegisterUserCallback = null;
    public static CallbackContext NSR_AppLoginCallback = null;
    public static CallbackContext NSR_AppPaymentCallback = null;
    public static CallbackContext NSR_SendEventCallback = null;
    public static CallbackContext NSR_SendActionCallback = null;
    public static CallbackContext NSR_PostMessageCallback = null;

    public static NSRCordovaInterface plugin = null;
    public static CordovaInterface cInterface = null;
    public static CordovaWebView webViewX = null;

    public static Context ctx = null;
    public static Activity act = null;

    private Properties config;
    private BroadcastReceiver wfReceiver;

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);

        plugin = this;
        webViewX = webView;
        cInterface = cordova;

        ctx = cordova.getContext();
        act = cordova.getActivity();

        Log.d(TAG, "INITIALIZE");

        try {
            setupHandler(new JSONObject());
        } catch (JSONException e) {
            e.printStackTrace();
        }

    }

    @Override
    public void onDestroy() {
        Log.d(TAG, "onDestroy");
        super.onDestroy();
    }

    /**
     * Executes the request and returns PluginResult.
     *
     * @param action            The action to execute.
     * @param args              JSONArry of arguments for the plugin.
     * @param callbackContext   The callback id used when calling back into JavaScript.
     * @return                  True if the action was valid, false if not.
     */
    public boolean execute(String action, CordovaArgs args, CallbackContext callbackContext) throws JSONException {


        if (ACTION_SETUP.equals(action))
            NSR_Setup(args, callbackContext);
        else if (ACTION_REGISTER_USER.equals(action))
            NSR_RegisterUser(args, callbackContext);
        else if (ACTION_APP_LOGIN.equals(action))
            NSR_AppLogin(args, callbackContext);
        else if(ACTION_APP_PAYMENT.equals(action))
            NSR_AppPayment(args, callbackContext);
        else if(ACTION_SEND_EVENT.equals(action))
            NSR_SendEvent(args, callbackContext);
        else if(ACTION_SEND_ACTION.equals(action))
            NSR_SendAction(args, callbackContext);
        else if(ACTION_POST_MESSAGE.equals(action))
            NSR_PostMessage(args, callbackContext);
        else if(ACTION_INIT_NSR.equals(action))
            initNSRCordovaInterface(args,callbackContext);
        else if(ACTION_START_SDK_MAIN_ACT.equals(action))
            startSDKMainActivity(args,callbackContext);

        //TODO ...
        //else if(ACTION_ONSENTDATA.equals(action))
            //onSentData(args, callbackContext);
        else
            return false;

        return true;
    }

    //startSDKActivity
    public void startSDKMainActivity(final CordovaArgs args, final CallbackContext callbackContext) throws JSONException {

        Log.d(TAG, ">>> startSDKMainActivity");

        NSR_StartSDKActivityCallback = callbackContext;

        try {

            String str = args.get(0).toString();
            JSONObject r = new JSONObject(str);
            r.put("message", "start_sdk");
            startSDKMainActivityHandler(r);

        } catch (JSONException e) {
            Log.d(TAG,e.getMessage());
            NSR_StartSDKActivityCallback.error(e.getMessage());
        }

    }

    //initNSRCordovaInterface
    public void initNSRCordovaInterface(final CordovaArgs args, final CallbackContext callbackContext) throws JSONException {

        Log.d(TAG, "INITIALIZE >>> initNSRCordovaInterface");

        NSR_InitCallback = callbackContext;


        try {

            String str = args.get(0).toString();
            JSONObject r = new JSONObject(str);
            r.put("message", "init_nsr");
            setupHandler(r);

        } catch (JSONException e) {
            Log.d(TAG,e.getMessage());
            NSR_InitCallback.error(e.getMessage());
        }


    }

    //NSR_Setup
    private void NSR_Setup(final CordovaArgs args, final CallbackContext callbackContext) throws JSONException {

        Log.d(TAG,"NSR_SETUP - NSRCordovaInterface.java - received: 'nsr_setup' <<<");

        NSR_SetupCallback = callbackContext;

        try {
            String str = args.get(0).toString();
            JSONObject r = new JSONObject(str);
            r.put("message", "NSR_Setup OK!");
            setupHandler(r);

        } catch (JSONException e) {
            Log.d(TAG,e.getMessage());
            NSR_SetupCallback.error(e.getMessage());
        }

    }

    //NSR_RegisterUser
    private void NSR_RegisterUser(final CordovaArgs args, final CallbackContext callbackContext) throws JSONException {

        Log.d(TAG,"NSR_RegisterUser - NSRCordovaInterface.java - received: 'nsr_register_user' <<<");

        NSR_RegisterUserCallback = callbackContext;

        try {
            String str = args.get(0).toString();
            JSONObject r = new JSONObject(str);
            r.put("message", "NSR_RegisterUser OK!");
            registerUserHandler(r);

        } catch (JSONException e) {
            Log.d(TAG,e.getMessage());
            NSR_RegisterUserCallback.error(e.getMessage());
        }

    }


    //NSR_AppLogin
    private void NSR_AppLogin(final CordovaArgs args, final CallbackContext callbackContext) throws JSONException {

        Log.d(TAG,"NSR_AppLogin - NSRCordovaInterface.java - received: 'nsr_app_login' <<<");

        NSR_AppLoginCallback = callbackContext;

        try {

            String str = args.get(0).toString();
            JSONObject r = new JSONObject(str);
            r.put("message", "NSR_AppLogin OK!");
            appLoginHandler(r);

        } catch (JSONException e) {
            Log.d(TAG,e.getMessage());
            NSR_AppLoginCallback.error(e.getMessage());
        }

    }

    //NSR_AppPayment
    private void NSR_AppPayment(final CordovaArgs args, final CallbackContext callbackContext) throws JSONException {

        Log.d(TAG,"NSR_AppPayment - NSRCordovaInterface.java - received: nsr_app_payment <<<");

        NSR_AppPaymentCallback = callbackContext;

        try {

            String str = args.get(0).toString();
            JSONObject r = new JSONObject(str);
            r.put("message", "NSR_AppPayment OK!");
            appPaymentHandler(r);

        } catch (JSONException e) {
            Log.d(TAG,e.getMessage());
            NSR_AppPaymentCallback.error(e.getMessage());
        }

    }

    //NSR_SendEvent
    private void NSR_SendEvent(final CordovaArgs args, final CallbackContext callbackContext) throws JSONException {

        Log.d(TAG,"NSR_SendEvent - NSRCordovaInterface.java - received: nsr_send_event <<<");

        NSR_SendEventCallback = callbackContext;

        try {

            String str = args.get(0).toString();
            JSONObject r = new JSONObject(str);
            r.put("message", "NSR_SendEvent OK!");
            sendEventHandler(r);

        } catch (JSONException e) {
            Log.d(TAG,e.getMessage());
            NSR_SendEventCallback.error(e.getMessage());
        }

    }

    //NSR_SendAction
    private void NSR_SendAction(final CordovaArgs args, final CallbackContext callbackContext) throws JSONException {

        Log.d(TAG,"NSR_SendAction - NSRCordovaInterface.java - received: nsr_send_action <<<");

        NSR_SendActionCallback = callbackContext;

        try {

            String str = args.get(0).toString();
            JSONObject r = new JSONObject(str);
            r.put("message", "NSR_SendAction OK!");
            sendActionHandler(r);

        } catch (JSONException e) {
            Log.d(TAG,e.getMessage());
            NSR_SendActionCallback.error(e.getMessage());
        }

    }

    //NSR_PostMessage
    private void NSR_PostMessage(final CordovaArgs args, final CallbackContext callbackContext) throws JSONException {

        Log.d(TAG,"NSR_PostMessage - NSRCordovaInterface.java - received: nsr_post_message <<<");

        NSR_PostMessageCallback = callbackContext;

        try {

            String str = args.get(0).toString();
            JSONObject r = new JSONObject(str);
            r.put("message", "nsr_post_message");
            sendPostMessageHandler(r);

        } catch (JSONException e) {
            Log.d(TAG,e.getMessage());
            NSR_PostMessageCallback.error(e.getMessage());
        }

    }


    //****************
    /*** HANDLERS ***/
    //****************

    public void startSDKMainActivityHandler(JSONObject data) throws JSONException {
        Log.d(TAG, "startSDKMainActivityHandler");

        new Handler(Looper.getMainLooper()).post(new Runnable() {
            public void run() {
                try {
                    Intent intent = new Intent(ctx, eu.neosurance.sdk_ext.NSRActivity.class);
                    intent.setFlags(Intent.FLAG_ACTIVITY_NO_HISTORY);
                    ctx.startActivity(intent);
                } catch (Throwable e) {
                    Log.d(TAG,e.getMessage());
                }
            }
        });

    }

    public void setupHandler(JSONObject data) throws JSONException {
        Log.d(TAG, "setupHandler");

        config = new Properties();
        try {
            config.load(ctx.getAssets().open("config.properties"));
        }catch (IOException e) {
            e.printStackTrace();
            NSR_SetupCallback.error(e.getMessage());
        }

        Log.d(TAG, "setup ctx: " + ctx);
        NSRSettings settings = new NSRSettings();
        settings.setBaseUrl(config.getProperty("base_url"));
        settings.setCode(config.getProperty("code"));
        settings.setSecretKey(config.getProperty("secret_key"));
        settings.setDevMode(true);
        settings.setWorkflowDelegate(new WFDelegate(),ctx);
        NSR.getInstance(ctx).askPermissions(act);

        wfReceiver = new WFReceiver(new NSRActivity());
        LocalBroadcastManager.getInstance(ctx).registerReceiver(wfReceiver, new IntentFilter("WFStuff"));

        NSRUtils.synchEventWebView(ctx);

        if(NSR_SetupCallback != null)
            NSR_SetupCallback.success(data);

    }

    public void registerUserHandler(JSONObject data) throws JSONException {
        Log.d(TAG, "registerUserHandler");
        try {
            NSR.getInstance(ctx).registerUser(new NSRUser(data));
            NSR_RegisterUserCallback.success(data);
        } catch (Exception e) {
            e.printStackTrace();
            NSR_RegisterUserCallback.error(data);
        }

    }

    public void appLoginHandler(JSONObject data) throws JSONException {
        Log.d(TAG, "appLoginHandler");

        String url = data.getString("url");
        WFDelegate wfTmp = new WFDelegate();
        wfTmp.setData(ctx, "login_url", url);


        new Handler().postDelayed(new Runnable() {
            public void run() {
                wfTmp.executeLogin(ctx, url);
            }
        }, 500);

        //Intent intent = new Intent("WFStuff");
        //intent.putExtra("message", "showLogin()");
        //LocalBroadcastManager.getInstance(ctx).sendBroadcast(intent);

        NSR_AppLoginCallback.success(data);
    }

    public void appPaymentHandler(JSONObject data) throws JSONException {
        Log.d(TAG, "appPaymentHandler");

        String url = data.getString("url");
        WFDelegate wfTmp = new WFDelegate();

        wfTmp.setData(ctx, "payment_url", url);

        new Handler().postDelayed(new Runnable() {
            public void run() {
                try {
                    wfTmp.executePayment(ctx, data.getJSONObject("payment"), url);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        }, 500);

        //Intent intent = new Intent("WFStuff");
        //intent.putExtra("message", "showPay()");
        //LocalBroadcastManager.getInstance(ctx).sendBroadcast(intent);

        NSR_AppPaymentCallback.success(data);
    }

    public void sendEventHandler(JSONObject data) throws JSONException {
        Log.d(TAG, "sendEventHandler");
        NSR_SendEventCallback.success(data);
    }

    public void sendActionHandler(JSONObject data) throws JSONException {
        Log.d(TAG, "sendActionHandler");
        NSR_SendActionCallback.success(data);
    }

    public void sendPostMessageHandler(JSONObject data) throws JSONException {
        Log.d(TAG, "sendPostMessageHandler");

        if(data.has("event") && data.has("payload")){
            NSR instance = NSR.getInstance(ctx);

            if(NSR.eventWebView == null)
                NSR.eventWebView = new NSREventWebView(ctx, instance);

            instance.sendEvent(data.getString("event"), data.getJSONObject("payload"));
            NSR_PostMessageCallback.success(data);
        }else{

            if(NSR.eventWebView == null)
                NSR.eventWebView = new NSREventWebView(ctx, NSR.getInstance(ctx));

            NSR.eventWebView.postMessage(data.toString());
            NSR_PostMessageCallback.success("apiCall");
        }
    }


}

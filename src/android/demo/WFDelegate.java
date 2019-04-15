package eu.neosurance.demo;

import android.app.Application;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Handler;
import android.os.Looper;
import android.support.v4.content.LocalBroadcastManager;
import android.util.Log;

import org.json.JSONObject;

import eu.neosurance.sdk.NSRWorkflowDelegate;

import static eu.neosurance.demo.MainActivity.TAG;


public class WFDelegate implements NSRWorkflowDelegate {

	@Override
	public boolean executeLogin(final Context ctx, final String url) {
		Log.d(TAG, "executeLogin");
		Log.d(TAG, "MainActivity: " + eu.neosurance.demo.MainActivity.created + " " + eu.neosurance.demo.MainActivity.ready);

		setData(ctx, "login_url", url);

		if (!eu.neosurance.demo.MainActivity.ready) {
			Log.d(TAG, "eu.neosurance.demo.MainActivity not ready");
			if (!eu.neosurance.demo.MainActivity.created) {
				Log.d(TAG, "eu.neosurance.demo.MainActivity launching");
				launchMainActivity(ctx);
			}
			new Handler().postDelayed(new Runnable() {
				public void run() {
					executeLogin(ctx, url);
				}
			}, 500);
		} else {
			Log.d(TAG, "eu.neosurance.demo.MainActivity ready");
			Intent intent = new Intent("WFStuff");
			intent.putExtra("message", "showLogin()");
			LocalBroadcastManager.getInstance(ctx).sendBroadcast(intent);
		}
		return true;
	}

	@Override
	public JSONObject executePayment(final Context ctx, final JSONObject payment, final String url) {
		Log.d(TAG, "executePayment");
		Log.d(TAG, "eu.neosurance.demo.MainActivity: " + eu.neosurance.demo.MainActivity.created + " " + eu.neosurance.demo.MainActivity.ready);

		setData(ctx, "payment_url", url);
		if (!eu.neosurance.demo.MainActivity.ready) {
			Log.d(TAG, "eu.neosurance.demo.MainActivity not ready");
			if (!eu.neosurance.demo.MainActivity.created) {
				launchMainActivity(ctx);
			}
			new Handler().postDelayed(new Runnable() {
				public void run() {
					executePayment(ctx, payment, url);
				}
			}, 500);
		} else {
			Log.d(TAG, "wfReceiver OK");
			Intent intent = new Intent("WFStuff");
			intent.putExtra("message", "showPay()");
			LocalBroadcastManager.getInstance(ctx).sendBroadcast(intent);
		}
		return null;
	}

	@Override
	public void confirmTransaction(Context ctx, JSONObject paymentInfo) {

	}

	public static String getData(Context ctx, String key) {
		SharedPreferences sp = ctx.getSharedPreferences("DemoIngPrefs", Application.MODE_PRIVATE);
		if (sp.contains(key)) {
			return sp.getString(key, "");
		} else {
			return null;
		}
	}

	public static void setData(Context ctx, String key, String value) {
		SharedPreferences sp = ctx.getSharedPreferences("DemoIngPrefs", Application.MODE_PRIVATE);
		SharedPreferences.Editor editor = sp.edit();
		if (value != null) {
			editor.putString(key, value);
		} else {
			editor.remove(key);
		}
		editor.commit();
	}

	private void launchMainActivity(final Context ctx) {
		Intent intent = new Intent(ctx, eu.neosurance.demo.MainActivity.class);
		intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
		ctx.startActivity(intent);
	}
}

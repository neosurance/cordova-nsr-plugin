package eu.neosurance.demo;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;

public class WFReceiver extends BroadcastReceiver {
	private MainActivity mainActivity;

	public WFReceiver(MainActivity mainActivity) {
		super();
		this.mainActivity = mainActivity;
	}

	@Override
	public void onReceive(Context context, Intent intent) {
		String message = intent.getStringExtra("message");
		Log.d("WFReceiver", "Got message: " + message);
		mainActivity.eval(message);
	}
}

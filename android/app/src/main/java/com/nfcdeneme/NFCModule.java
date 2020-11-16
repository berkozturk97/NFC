package com.nfcdeneme;

import android.widget.Toast;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import android.nfc.NdefMessage;
import android.nfc.NdefRecord;
import android.nfc.NfcAdapter;
import android.nfc.NfcAdapter.OnNdefPushCompleteCallback;
import android.nfc.NfcAdapter.CreateNdefMessageCallback;
import android.nfc.NfcEvent;

import java.util.Map;
import java.util.HashMap;

public class NFCModule extends ReactContextBaseJavaModule implements
        CreateNdefMessageCallback, OnNdefPushCompleteCallback{
    private static ReactApplicationContext reactContext;
    NfcAdapter nfcAdapter;
    String Text = "sdfasd";
    private static final String DURATION_SHORT_KEY = "SHORT";
    private static final String DURATION_LONG_KEY = "LONG";

    NFCModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
       // nfcAdapter.setNdefPushMessageCallback(this, this);
       // nfcAdapter.setOnNdefPushCompleteCallback(this, this);
    }


    @Override
    public String getName() {
        return "ToastExample";
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
        constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
        return constants;
    }

    public void show(String message, int duration) {
        Toast.makeText(getReactApplicationContext(), message, duration).show();
    }

    @Override
    public void onNdefPushComplete(NfcEvent event) {
        final String eventString = "onNdefPushComplete\n" + event.toString();

    }

    @ReactMethod
    @Override
    public NdefMessage createNdefMessage(NfcEvent nfcEvent) {
        String stringOut = Text;
        byte[] bytesOut = stringOut.getBytes();

        NdefRecord ndefRecordOut = new NdefRecord(
                NdefRecord.TNF_MIME_MEDIA,
                "text/plain".getBytes(),
                new byte[] {},
                bytesOut);
        NdefMessage ndefMessageout = new NdefMessage(ndefRecordOut);
        return ndefMessageout;
    }
}
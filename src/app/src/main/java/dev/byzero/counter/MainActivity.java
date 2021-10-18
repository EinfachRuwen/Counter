package dev.byzero.counter;

import androidx.appcompat.app.AppCompatActivity;
import androidx.annotation.*;
import androidx.appcompat.widget.Toolbar;
import com.google.android.material.floatingactionbutton.FloatingActionButton;
import android.app.*;
import android.os.*;
import android.view.*;
import android.view.View.*;
import android.widget.*;
import android.content.*;
import android.graphics.*;
import android.media.*;
import android.net.*;
import android.text.*;
import android.util.*;
import android.webkit.*;
import android.animation.*;
import android.view.animation.*;
import java.util.*;
import java.text.*;
import java.util.Timer;
import java.util.TimerTask;
import android.app.Activity;
import android.content.SharedPreferences;
import android.content.Intent;
import android.net.Uri;
import android.view.View;

public class MainActivity extends AppCompatActivity {
	
	private Timer _timer = new Timer();
	
	private Toolbar _toolbar;
	private FloatingActionButton _fab;
	
	private LinearLayout linear4;
	private LinearLayout linear5;
	private LinearLayout linear11;
	private LinearLayout linear12;
	private LinearLayout linear6;
	private LinearLayout linear7;
	private LinearLayout linear8;
	private LinearLayout linear9;
	private TextView thousand;
	private TextView hundred;
	private TextView ten;
	private TextView one;
	private Button plus;
	private LinearLayout linear13;
	private Button minus;
	private Button reset;
	
	private TimerTask timer;
	private SharedPreferences settings;
	private Intent i = new Intent();
	@Override
	protected void onCreate(Bundle _savedInstanceState) {
		super.onCreate(_savedInstanceState);
		setContentView(R.layout.main);
		initialize(_savedInstanceState);
		initializeLogic();
	}
	
	private void initialize(Bundle _savedInstanceState) {
		
		_toolbar = (Toolbar) findViewById(R.id._toolbar);
		setSupportActionBar(_toolbar);
		getSupportActionBar().setDisplayHomeAsUpEnabled(true);
		getSupportActionBar().setHomeButtonEnabled(true);
		_toolbar.setNavigationOnClickListener(new View.OnClickListener() {
			@Override
			public void onClick(View _v) {
				onBackPressed();
			}
		});
		_fab = (FloatingActionButton) findViewById(R.id._fab);
		
		linear4 = (LinearLayout) findViewById(R.id.linear4);
		linear5 = (LinearLayout) findViewById(R.id.linear5);
		linear11 = (LinearLayout) findViewById(R.id.linear11);
		linear12 = (LinearLayout) findViewById(R.id.linear12);
		linear6 = (LinearLayout) findViewById(R.id.linear6);
		linear7 = (LinearLayout) findViewById(R.id.linear7);
		linear8 = (LinearLayout) findViewById(R.id.linear8);
		linear9 = (LinearLayout) findViewById(R.id.linear9);
		thousand = (TextView) findViewById(R.id.thousand);
		hundred = (TextView) findViewById(R.id.hundred);
		ten = (TextView) findViewById(R.id.ten);
		one = (TextView) findViewById(R.id.one);
		plus = (Button) findViewById(R.id.plus);
		linear13 = (LinearLayout) findViewById(R.id.linear13);
		minus = (Button) findViewById(R.id.minus);
		reset = (Button) findViewById(R.id.reset);
		settings = getSharedPreferences("settings", Activity.MODE_PRIVATE);
		
		plus.setOnClickListener(new View.OnClickListener() {
			@Override
			public void onClick(View _view) {
				if (one.getText().toString().equals("9")) {
					if (ten.getText().toString().equals("9")) {
						if (hundred.getText().toString().equals("9")) {
							if (thousand.getText().toString().equals("9")) {
								SketchwareUtil.showMessage(getApplicationContext(), "Did you really click for that long? :o ");
								thousand.setText("0");
								timer = new TimerTask() {
									@Override
									public void run() {
										runOnUiThread(new Runnable() {
											@Override
											public void run() {
												hundred.setText("0");
												timer = new TimerTask() {
													@Override
													public void run() {
														runOnUiThread(new Runnable() {
															@Override
															public void run() {
																ten.setText("0");
																timer = new TimerTask() {
																	@Override
																	public void run() {
																		runOnUiThread(new Runnable() {
																			@Override
																			public void run() {
																				one.setText("0");
																			}
																		});
																	}
																};
																_timer.schedule(timer, (int)(100));
															}
														});
													}
												};
												_timer.schedule(timer, (int)(100));
											}
										});
									}
								};
								_timer.schedule(timer, (int)(100));
							}
							else {
								thousand.setText(String.valueOf((long)(Double.parseDouble(thousand.getText().toString()) + 1)));
								hundred.setText("0");
								ten.setText("0");
								one.setText("0");
							}
						}
						else {
							hundred.setText(String.valueOf((long)(Double.parseDouble(hundred.getText().toString()) + 1)));
							ten.setText("0");
							one.setText("0");
						}
					}
					else {
						ten.setText(String.valueOf((long)(Double.parseDouble(ten.getText().toString()) + 1)));
						one.setText("0");
					}
				}
				else {
					one.setText(String.valueOf((long)(Double.parseDouble(one.getText().toString()) + 1)));
				}
				_zustandspeichern();
			}
		});
		
		minus.setOnClickListener(new View.OnClickListener() {
			@Override
			public void onClick(View _view) {
				if (one.getText().toString().equals("0")) {
					if (ten.getText().toString().equals("0")) {
						if (hundred.getText().toString().equals("0")) {
							if (thousand.getText().toString().equals("0")) {
								SketchwareUtil.showMessage(getApplicationContext(), "Welcome back :D");
								thousand.setText("9");
								timer = new TimerTask() {
									@Override
									public void run() {
										runOnUiThread(new Runnable() {
											@Override
											public void run() {
												hundred.setText("9");
												timer = new TimerTask() {
													@Override
													public void run() {
														runOnUiThread(new Runnable() {
															@Override
															public void run() {
																ten.setText("9");
																timer = new TimerTask() {
																	@Override
																	public void run() {
																		runOnUiThread(new Runnable() {
																			@Override
																			public void run() {
																				one.setText("9");
																			}
																		});
																	}
																};
																_timer.schedule(timer, (int)(100));
															}
														});
													}
												};
												_timer.schedule(timer, (int)(100));
											}
										});
									}
								};
								_timer.schedule(timer, (int)(100));
							}
							else {
								thousand.setText(String.valueOf((long)(Double.parseDouble(thousand.getText().toString()) - 1)));
								hundred.setText("9");
								ten.setText("9");
								one.setText("9");
							}
						}
						else {
							hundred.setText(String.valueOf((long)(Double.parseDouble(hundred.getText().toString()) - 1)));
							ten.setText("9");
							one.setText("9");
						}
					}
					else {
						ten.setText(String.valueOf((long)(Double.parseDouble(ten.getText().toString()) - 1)));
						one.setText("9");
					}
				}
				else {
					one.setText(String.valueOf((long)(Double.parseDouble(one.getText().toString()) - 1)));
				}
				_zustandspeichern();
			}
		});
		
		reset.setOnClickListener(new View.OnClickListener() {
			@Override
			public void onClick(View _view) {
				thousand.setText("0");
				timer = new TimerTask() {
					@Override
					public void run() {
						runOnUiThread(new Runnable() {
							@Override
							public void run() {
								hundred.setText("0");
								timer = new TimerTask() {
									@Override
									public void run() {
										runOnUiThread(new Runnable() {
											@Override
											public void run() {
												ten.setText("0");
												timer = new TimerTask() {
													@Override
													public void run() {
														runOnUiThread(new Runnable() {
															@Override
															public void run() {
																one.setText("0");
															}
														});
													}
												};
												_timer.schedule(timer, (int)(100));
											}
										});
									}
								};
								_timer.schedule(timer, (int)(100));
							}
						});
					}
				};
				_timer.schedule(timer, (int)(100));
				_zustandspeichern();
			}
		});
		
		_fab.setOnClickListener(new View.OnClickListener() {
			@Override
			public void onClick(View _view) {
				i.setClass(getApplicationContext(), SettingsActivity.class);
				startActivity(i);
			}
		});
	}
	private void initializeLogic() {
		if (settings.getString("settings_toggle", "").equals("")) {
			settings.edit().putString("settings_toggle", "y").commit();
			_zustandspeichern();
			thousand.setText(settings.getString("state_thousand", ""));
			timer = new TimerTask() {
				@Override
				public void run() {
					runOnUiThread(new Runnable() {
						@Override
						public void run() {
							hundred.setText(settings.getString("state_hundred", ""));
							timer = new TimerTask() {
								@Override
								public void run() {
									runOnUiThread(new Runnable() {
										@Override
										public void run() {
											ten.setText(settings.getString("state_ten", ""));
											timer = new TimerTask() {
												@Override
												public void run() {
													runOnUiThread(new Runnable() {
														@Override
														public void run() {
															one.setText(settings.getString("state_one", ""));
														}
													});
												}
											};
											_timer.schedule(timer, (int)(100));
										}
									});
								}
							};
							_timer.schedule(timer, (int)(100));
						}
					});
				}
			};
			_timer.schedule(timer, (int)(100));
			SketchwareUtil.showMessage(getApplicationContext(), "Loaded the state from the local storage");
		}
		else {
			thousand.setText(settings.getString("state_thousand", ""));
			timer = new TimerTask() {
				@Override
				public void run() {
					runOnUiThread(new Runnable() {
						@Override
						public void run() {
							hundred.setText(settings.getString("state_hundred", ""));
							timer = new TimerTask() {
								@Override
								public void run() {
									runOnUiThread(new Runnable() {
										@Override
										public void run() {
											ten.setText(settings.getString("state_ten", ""));
											timer = new TimerTask() {
												@Override
												public void run() {
													runOnUiThread(new Runnable() {
														@Override
														public void run() {
															one.setText(settings.getString("state_one", ""));
														}
													});
												}
											};
											_timer.schedule(timer, (int)(100));
										}
									});
								}
							};
							_timer.schedule(timer, (int)(100));
						}
					});
				}
			};
			_timer.schedule(timer, (int)(100));
			SketchwareUtil.showMessage(getApplicationContext(), "Loaded the state from the local storage");
		}
		if (!settings.getString("settings_buttonfontsize", "").equals("")) {
			plus.setTextSize(80);
			minus.setTextSize(80);
		}
	}
	
	@Override
	protected void onActivityResult(int _requestCode, int _resultCode, Intent _data) {
		
		super.onActivityResult(_requestCode, _resultCode, _data);
		
		switch (_requestCode) {
			
			default:
			break;
		}
	}
	
	private void _zustandspeichern () {
		settings.edit().putString("state_one", one.getText().toString()).commit();
		settings.edit().putString("state_ten", ten.getText().toString()).commit();
		settings.edit().putString("state_hundred", hundred.getText().toString()).commit();
		settings.edit().putString("state_thousand", thousand.getText().toString()).commit();
	}
	
	
	private void _ShowSnackbar (final String _message, final String _buttonText, final double _duration) {
		String ButtonText = "OK";
		if (!_buttonText.equals("")) {
			ButtonText = _buttonText;
		}
		ViewGroup parentLayout = (ViewGroup) ((ViewGroup) this .findViewById(android.R.id.content)).getChildAt(0);
		
		com.google.android.material.snackbar.Snackbar snackbar =
		com.google.android.material.snackbar.Snackbar.make(parentLayout, _message, com.google.android.material.snackbar.Snackbar.LENGTH_INDEFINITE).setAction(ButtonText, new View.OnClickListener() {
			 @Override 
			public void onClick(View view) {
			} 
		});
		if (!(_duration == 0)) {
			snackbar.setDuration((int)_duration*1000);
		}
		snackbar.show();
	}
	
	
	@Deprecated
	public void showMessage(String _s) {
		Toast.makeText(getApplicationContext(), _s, Toast.LENGTH_SHORT).show();
	}
	
	@Deprecated
	public int getLocationX(View _v) {
		int _location[] = new int[2];
		_v.getLocationInWindow(_location);
		return _location[0];
	}
	
	@Deprecated
	public int getLocationY(View _v) {
		int _location[] = new int[2];
		_v.getLocationInWindow(_location);
		return _location[1];
	}
	
	@Deprecated
	public int getRandom(int _min, int _max) {
		Random random = new Random();
		return random.nextInt(_max - _min + 1) + _min;
	}
	
	@Deprecated
	public ArrayList<Double> getCheckedItemPositionsToArray(ListView _list) {
		ArrayList<Double> _result = new ArrayList<Double>();
		SparseBooleanArray _arr = _list.getCheckedItemPositions();
		for (int _iIdx = 0; _iIdx < _arr.size(); _iIdx++) {
			if (_arr.valueAt(_iIdx))
			_result.add((double)_arr.keyAt(_iIdx));
		}
		return _result;
	}
	
	@Deprecated
	public float getDip(int _input){
		return TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, _input, getResources().getDisplayMetrics());
	}
	
	@Deprecated
	public int getDisplayWidthPixels(){
		return getResources().getDisplayMetrics().widthPixels;
	}
	
	@Deprecated
	public int getDisplayHeightPixels(){
		return getResources().getDisplayMetrics().heightPixels;
	}
	
}

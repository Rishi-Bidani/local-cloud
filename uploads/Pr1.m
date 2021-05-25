% Linear regression - calling code
clc; clear; close all;
format compact
x = [3 5 6 8 10 11 15];
y = [7 11 13 19 24 29 35];
if length(x)~= length(y)
    error('The vectors must be of the same length');
end
t=min(x):0.01:max(x)
[a1,a0,r2] = linearModel(x,y)
%linear model
Lmodel=a1*t+a0;
plot(t,Lmodel);
hold on
%exponential fit
[alpha1,beta1,r2_exp] = exp_Model(x,y)
Emodel=alpha1*exp(beta1*t);
plot(t,Emodel);
%power model fit
[alpha2,beta2,r2_power] = power_Model(x,y)
Pmodel=alpha2*t.^beta2;
plot(t,Pmodel);
% First order SGR model
[alpha3,beta3,r2_sgr] = SGR_Model(x,y)
SGRmodel = alpha3*t./(beta3+t);
plot(t,SGRmodel)
legend('Linear fit','Exp fit','Power fit','SGR fit')
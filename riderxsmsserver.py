from flask import Flask, request, redirect
from twilio.twiml.messaging_response import MessagingResponse
# import tns
import dataloader

cred = "a1b5p5i9"

app = Flask(__name__)


def setcreds(nc):
    global cred
    cred = nc

    return "success"

incomingstate = 0
incomingnum = 0
doctorname = "Dr Victor Von Doom"
patientname = "Reed Richards"
aptdate = "02/01/2022"
apttime = "16:20"

def syncappdata():
    global doctorname, patientname, aptdate, apttime
    
    doctorname, patientname, aptdate, apttime = dataloader.getRRXdata()

@app.route("/smsbase", methods=['POST'])
def sms_reply():
    """Respond to incoming calls with a simple text message."""

    global incomingstate, incomingnum
    global cred
    global doctorname, patientname, aptdate, apttime

    incoming = request.values['Body']
    
    incoming = incoming.lower()

    print("incoming text is " + incoming)


    # Start our TwiML response
    resp = MessagingResponse()

    flag = 0
    outstring = "The Robots are coming! Head for the hills! Also, i did not understand the following message ..." + incoming

    if incomingstate == 0:
        if 'hello' in incoming:
            outstring= "Hi thank you for using RideRX. Please confirm your appointment on the app and then respond yes or start" 
            flag = 1
            incomingstate = 1
            resp.message(outstring)

            return str(resp)
    
    if incomingstate == 1:
        if 'yes' in incoming or 'start' in incoming:
            outstring= "Hi"+ patientname + ", You have an appointment scheduled with "+ doctorname + " on "+ aptdate + " at "+ apttime + ". Please respond with Yes if you would like RideRX to help ypu get there." 
            flag = 1
            incomingstate = 2
            resp.message(outstring)

            return str(resp)
    
    
    if incomingstate == 2:
        if 'yes' in incoming or 'start' in incoming:
            outstring= "Hi "+ patientname + ", have you been contracted with COVID-19 or any other contagious infection in the past 15 days? Please respond with yes or no." 
            flag = 1
            incomingstate = 3
            resp.message(outstring)

            return str(resp)

    if incomingstate == 3:
        if 'no' in incoming:
            outstring= "Hi "+ patientname + ", thank you for confirming. Do you have a fever? Please respond with yes or no." 
            flag = 1
            incomingstate = 4
            resp.message(outstring)

            return str(resp)
        if 'yes' in incoming:
            outstring= "Hi "+ patientname + ", thank you for confirming. Sorry, based on your answers, you're not eligible for availing RideRX assistance for getting to you appointment. Please contact the hospital for further assistance" 
            flag = 1
            incomingstate = 0
            dataloader.resetstate()
            resp.message(outstring)

            return str(resp)

    if incomingstate == 4:
        if 'no' in incoming:
            outstring= "Hi "+ patientname + ", thank you for confirming. You're eligible for getting assistance from RideRX. Contact the hospital on +18005555555 to confirm your spot." 
            flag = 1
            incomingstate = 0
            dataloader.resetstate()
            resp.message(outstring)

            return str(resp)
        if 'yes' in incoming:
            outstring= "Hi "+ patientname + ", thank you for confirming. Sorry, based on your answers, you're not eligible for availing RideRX assistance for getting to you appointment. Please contact the hospital for further assistance" 
            flag = 1
            incomingstate = 0
            resp.message(outstring)
            dataloader.resetstate()
            return str(resp)
    
    

    # if "setcreds" in incoming:
    #     words = incoming.split()
    #     cred = words[1]

    #     ns = setcreds(cred)

    #     outstring =  "status: " + ns + " thank you for using thebot"
    #     flag = 1

    # if "modifykey" in incoming:
    #     words = incoming.split()
        
    #     name = words[1]
    #     symbol = words[2]
    #     key = words[3]


    #     ns = tns.modifykey(cred, name, symbol, key)

    #     outstring =  "status: " + ns + " thank you for using thebot"
    #     flag = 1


    # if "getkeys" in incoming:
    #     words = incoming.split()
        
    #     name = words[1]

    #     ks =  tns.getkeys(cred, name)

    #     ns = " "

    #     for k in ks['DATA']:
    #         print (k[3] + ": " + k[1] + ":  " + k[2])
    #         ns = ns + k[3] + ": " + k[1] + ":  " + k[2] +"\n"
        

        # outstring =  " thank you for using RideRX"
        # flag = 1



    # Add a message
    if flag ==0:
        outstring = "The Robots are coming! Head for the hills! Also, i did not understand the following message ..." + incoming
    
    resp.message(outstring)

    return str(resp)

if __name__ == "__main__":
    app.run(debug=True, host = 'localhost', port = 8004)
    # app.run(debug=True, host = '45.79.199.42', port = 8004)

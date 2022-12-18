"""
Demonstration of the GazeTracking library.
Check the README.md for complete documentation.
"""
import dlib
import cv2
from gaze_tracking import GazeTracking
from scipy.spatial import distance
from imutils import face_utils
import imutils
import pygame

pygame.mixer.init()
pygame.mixer.music.load('audio/alert.wav')

def eye_aspect_ratio(eye):
    A = distance.euclidean(eye[1], eye[5])
    B = distance.euclidean(eye[2], eye[4])
    C = distance.euclidean(eye[0], eye[3])
    ear = (A + B) / (2.0 * C)
    return ear

thresh = 0.22
frame_check = 20
detect = dlib.get_frontal_face_detector()
predict = dlib.shape_predictor(".\shape_predictor_68_face_landmarks.dat")  # Dat file is the crux of the code

(lStart, lEnd) = face_utils.FACIAL_LANDMARKS_68_IDXS["left_eye"]
(rStart, rEnd) = face_utils.FACIAL_LANDMARKS_68_IDXS["right_eye"]

gaze = GazeTracking()
webcam = cv2.VideoCapture(0)
flag=0
flag1=0

while True:
    # We get a new frame from the webcam
    ret, frame = webcam.read()
    # We send this frame to GazeTracking to analyze it
    gaze.refresh(frame)

    text = ""

    frame = imutils.resize(frame, width=600)
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    subjects = detect(gray, 0)
    for subject in subjects:
        shape = predict(gray, subject)
        shape = face_utils.shape_to_np(shape)  # converting to NumPy Array
        leftEye = shape[lStart:lEnd]
        rightEye = shape[rStart:rEnd]
        leftEAR = eye_aspect_ratio(leftEye)
        rightEAR = eye_aspect_ratio(rightEye)
        ear = (leftEAR + rightEAR) / 2.0
        leftEyeHull = cv2.convexHull(leftEye)
        rightEyeHull = cv2.convexHull(rightEye)
        cv2.drawContours(frame, [leftEyeHull], -1, (0, 255, 0), 1)
        cv2.drawContours(frame, [rightEyeHull], -1, (0, 255, 0), 1)
        if ear < thresh:
            flag += 1
            print(flag)
            if flag >= frame_check:
                cv2.putText(frame, "****************ALERT!****************", (40, 30),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)
                cv2.putText(frame, "****************ALERT!****************", (40, 450),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)
            # print ("Drowsy")
            flag1=1
        else:
            flag = 0
            flag1=0

    left_pupil = gaze.pupil_left_coords()
    right_pupil = gaze.pupil_right_coords()
    if gaze.is_up():
        text = "Looking up"
        print("UP")
        image=frame
        print(lStart, lEnd)
        rev=image[leftEye[1][1]-50:leftEye[5][1]+50, leftEye[0][0]-50:leftEye[3][0]+50]
        print("leftEye: ", leftEye[0], leftEye[3])
        cv2.line(rev, (0-(leftEye[0][0]-50), leftEye[0][1]-(leftEye[1][1]-50)), (600-(leftEye[0][0]-50), leftEye[0][1]-(leftEye[1][1]-50)), (255, 0, 0), 1)
        cv2.line(rev, (0-(leftEye[0][0]-50), leftEye[3][1]-(leftEye[1][1]-50)), (600-(leftEye[0][0]-50), leftEye[3][1]-(leftEye[1][1]-50)), (0, 255, 0), 1)
        Rev2 = cv2.resize(rev, dsize=(600, 600), interpolation=cv2.INTER_AREA)
        cv2.imshow("Test", Rev2)
        flag1=1

    if flag1 == 1:
        pygame.mixer.music.play(-1)
    elif flag1 != 1:
        pygame.mixer.music.stop()

    cv2.putText(frame, text, (90, 60), cv2.FONT_HERSHEY_DUPLEX, 1.6, (147, 58, 31), 2)
    cv2.putText(frame, "Left pupil:  " + str(right_pupil), (90, 130), cv2.FONT_HERSHEY_DUPLEX, 0.9, (147, 58, 31), 1)
    cv2.putText(frame, "Right pupil: " + str(left_pupil), (90, 165), cv2.FONT_HERSHEY_DUPLEX, 0.9, (147, 58, 31), 1)
    cv2.imshow("Demo", frame)

    key = cv2.waitKey(1) & 0xFF
    if key == ord("q"):
        break

cv2.destroyAllWindows()
webcam.stop()

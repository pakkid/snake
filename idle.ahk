number := 1 ; Initialize the counter variable

SetTimer, AutoSave, 60000 ; Periodically save every 60 seconds

; Prompt the user to focus the desired window
MsgBox, 0, Start Typing, Press OK when you are ready to start typing.

Loop
{
    ; Check if the user pressed Backspace to stop the script
    if GetKeyState("Backspace", "P")
        ExitApp

    ; Write the number and the phrase character by character
    phrase := number . " The quick brown fox jumps over the lazy dog"
    Loop, Parse, phrase
    {
        Send, %A_LoopField%
        Sleep, 200 ; Wait 500ms between characters (2 characters per second)
    }
    
    ; Move to the next line
    Send, {Enter}

    ; Increment the counter
    number++
}

AutoSave:
Send, ^s ; Send Ctrl + S to save the file
Return

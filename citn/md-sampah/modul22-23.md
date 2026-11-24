
## Bagian 1
<!-- 2026-11-24 20:37:53 -->

2.2.1 Primary Command Modes

In the previous topic, you learned that all network devices reguire an OS and that they can be configured using the CLI or a GUI. Using the
CLI may provide the network administrator with more precise control and flexibility than using the GUI. This topic discusses using CLI to
navigate the Cisco IOS.

As a security feature, the Cisco IOS software separates management access into the following two command modes:

« User EXEC Mode - This mode has limited capabilities but is useful for basic operations. It allows only a limited number of basic
monitoring commands but does not allow the execution of any commands that might change the configuration of the device. The
user EXEC mode is identified by the CLI prompt that ends with the > symbol.

« Privileged EXEC Mode - To execute configuration commands, a network administrator must access privileged EXEC mode. Higher
configuration modes, like global configuration mode, can only be reached from privileged EXEC mode. The privileged EXEC mode
can be identified by the prompt ending with the # symbol.

The table summarizes the two modes and displays the default CLI prompts of a Cisco switch and router.
Default Devi
Command Mode Description AU Evie
Prompt
e Made allows access ta anlv a limited number af basir manitarina cammands (ed


## Bagian 2
<!-- 2026-11-24 20:38:17 -->

can be identified by the prompt ending with the # symbol.
The table summarizes the two modes and displays the default CLI prompts of a Cisco switch and router.
Default Device
Command Mode Description
Prompt
« Mode allows access to only a limited number of basic monitoring commands. Switch»
User Exec Mode . as “
« Itis often referred to as “view-only" mode. Router>
« Mode allows access to all commands and features.
Privileged EXEC an . Switch#
« The user can use any monitoring commands and execute configuration and
Mode Router#
management commands.
Pa “ 5 “Jaa r
| pn ._ =o | 1 © ly,
ta - at


## Bagian 3
<!-- 2026-11-24 20:38:20 -->

navigate the Cisco IOS.
As a security feature, the Cisco IOS software separates management access into the following two command modes:

« User EXEC Mode - This mode has limited capabilities but is useful for basic operations. It allows only a limited number of basic
monitoring commands but does not allow the execution of any commands that might change the configuration of the device. The
user EXEC mode is identified by the CLI prompt that ends with the > symbol.

« Privileged EXEC Mode - To execute configuration commands, a network administrator must access privileged EXEC mode. Higher
configuration modes, like global configuration mode, can only be reached from privileged EXEC mode. The privileged EXEC mode
can be identified by the prompt ending with the # symbol.

The table summarizes the two modes and displays the default CLI prompts of a Cisco switch and router.
Default Devi
Command Mode Description Tau Device
Prompt
« Mode allows access to only a limited number of basic monitoring commands. Switch>
User Exec Mode . .
« Itis often referred to as “view-only" mode. Router>
« Mode allows access to all commands and features.
Privileged EXEC an . Switch#
« The user can use any monitoring commands and execute configuration and
Mode Router#
management commands.


## Bagian 4
<!-- 2026-11-24 20:39:05 -->

2.2.2 Configuration Mode and Subconfiguration Modes
To configure the device, the user must enter global configuration mode, which is commonly called global config mode.
From global config mode, CLI configuration changes are made that affect the operation of the device as a whole. Global configuration
mode is identified by a prompt that ends with (config)# after the device name, such as Switch(config)#.
Global configuration mode is accessed before other specific configuration modes. From global config mode, the user can enter different
subconfiguration modes. Each of these modes allows the configuration of a particular part or function of the IOS device. Two common
subconfiguration modes include:

« Line Configuration Mode - Used to configure console, SSH, Telnet, or AUX access.

« Interface Configuration Mode - Used to configure a switch port or router network interface.
When the CLI is used, the mode is identified by the command-line prompt that is unique to that mode. By default, every prompt begins
with the device name. Following the name, the remainder of the prompt indicates the mode. For example, the default prompt for line
configuration mode is Switch(config-line)# and the default prompt for interface configuration mode is Switch(config-if)#.


## Bagian 5
<!-- 2026-11-24 20:41:04 -->

2.2.3 Video - IOS CLI Primary Command Modes
Click Play in the figure to view a video demonstration of navigating between IOS modes.
Video — IOS CLI Primary Command Modes
This video will cover the following:
+ User EXEC mode
+ Privileged EXEC mode
+ Global config mode


## Bagian 6
<!-- 2026-11-24 20:43:48 -->

2.2.4 Navigate Between IOS Modes
Various commands are used to move in and out of command prompts. To move from user EXEC mode to privileged EXEC mode, use the
enable command. Use the disable privileged EXEC mode command to return to user EXEC mode.
Note: Privileged EXEC mode is sometimes called enable mode.
To move in and out of global configuration mode, use the configure terminal privileged EXEC mode command. To return to the privileged
EXEC mode, enter the exit global config mode command.
There are many different subconfiguration modes. For example, to enter line subconfiguration mode, you use the line command followed
by the management line type and number you wish to access. Use the exit command to exit a subconfiguration mode and return to
global configuration mode.

Switch(config)# line console @

Switch(config-line)# exit

Switch(config)#


## Bagian 7
<!-- 2026-11-24 20:45:17 -->

Switch(config)# line console @
Switch(config-line)# exit
Switch(config)#
To move from any subconfiguration mode of the global configuration mode to the mode one step above it in the hierarchy of modes,
enter the exit command.
To move from any subconfiguration mode to the privileged EXEC mode, enter the end command or enter the key combination Ctrl+Z.
Switch(config-line)# end
Switch#
You can also move directly from one subconfiguration mode to another. Notice how after selecting an interface, the command prompt
changes from (config-line)# to (config-if)#.
Switch(config-line)# interface FastEthernet 0/1
Switch(config-if)#


## Bagian 8
<!-- 2026-11-24 20:46:31 -->

2.2.5 Video - Navigate Between IOS Modes
Click Play in the figure to view a video demonstration of how to move between various IOS CLI modes.
Video — Navigate between IOS Modes
This video will cover the following:

* enable

+ disable

* configure terminal

“exit

* end

+ Control + Z on keyboard

+ Othercommands to enter sub configuration modes


## Bagian 9
<!-- 2026-11-24 20:46:49 -->

This video will cover the following:

* enable

* disable

* configure terminal

“exit

* end

+ Control + Z on keyboard

+ Other.commands to enter sub configuration modes
Transcript


## Bagian 10
<!-- 2026-11-24 20:47:04 -->

bemstOra Gr? AQRQOS ES >
RMQengvrvmae,e Ba
a
Navigate Between IOS Modes J 9 4
enable Pot | Switch1
disable
configure terminal .
exit Is
end
Ctitz
line console 0
line My 0 15
interface Van 1
: ng o move between the - >
Time 0045460. )C_) ; - (© Realtime] ee
Series citferent iOS command modes.
eer ph OP >
> 4) 0:08/3:52 x BB
Transcript


## Bagian 11
<!-- 2026-11-24 20:50:55 -->

2.2.6 A Note About Syntax Checker Activities
When you are learning how to modify device configurations, you might want to start in a safe, non-production environment before trying it
on real eguipment. NetAcad gives you different simulation tools to help build your configuration and troubleshooting skills. Because these
are simulation tools, they typically do not have all the functionality of real eguipment. One such tool is the Syntax Checker. In each Syntax
Checker, you are given a set of instructions to enter a specific set of commands. You cannot progress in Syntax Checker unless the exact
and full command is entered as specified. More advanced simulation tools, such as Packet Tracer, let you enter abbreviated commands,
much as you would do on real eguipment.
a — - TE ~
We Lee — a ait
| ‘ ‘ , “ # dis
£ “ + | Va: ,
FO x , , © “< " 3 ff f
| » ba f as : .


## Bagian 12
<!-- 2026-11-24 20:56:33 -->

2.2.7 Syntax Checker - Navigate Between IOS Modes
Use the Syntax Checker activity to navigate between IOS command lines on a switch.

Enter privileged EXEC mode using the enable command.

Switch>


## Bagian 13
<!-- 2026-11-24 20:57:03 -->

2.2.7 Syntax Checker - Navigate Between IOS Modes
Use the Syntax Checker activity to navigate between IOS command lines on a switch.

Enter privileged EXEC mode using the enable command.

Switch> enable

Return to user EXEC mode using the disable command.

Switch# disable

Re-enter privileged EXEC mode.

Switch> enable


## Bagian 14
<!-- 2026-11-24 20:57:11 -->

2.2.7 Syntax Checker - Navigate Between IOS Modes
Use the Syntax Checker activity to navigate between IOS command lines on a switch.
Re-enter privileged EXEC mode.
Switch> enable
Enter global configuration mode using the configure terminal command.
Switch# configure terminal
Exit global configuration mode and return to privileged EXEC mode using the exit command.
Switch(config)# exit
Re-enter global configuration mode. J


## Bagian 15
<!-- 2026-11-24 20:57:14 -->

2.2.7 Syntax Checker - Navigate Between IOS Modes
Use the Syntax Checker activity to navigate between IOS command lines on a switch.

Exit global configuration mode and return to privileged EXEC mode using the exit command.

Switch(config)# exit

Re-enter global configuration mode.

Switch# configure terminal

Enter line subconfiguration mode for the console port using the line console 0 command.

Switch(config)# line console @

Return to global configuration mode using the exit command.


## Bagian 16
<!-- 2026-11-24 20:57:18 -->

2.2.7 Syntax Checker - Navigate Between IOS Modes
Use the Syntax Checker activity to navigate between IOS command lines on a switch.

Enter line subconfiguration mode for the console port using the line console 0 command.

Switch(config)# line console @

Return to global configuration mode using the exit command.

Switch(config-line)# exit

Enter VTY line subconfiguration mode using the line vty 0 15 command.

Switch(config)# line vty 0 15

Return to global configuration mode.


## Bagian 17
<!-- 2026-11-24 20:57:20 -->

2.2.7 Syntax Checker - Navigate Between IOS Modes
Use the Syntax Checker activity to navigate between IOS command lines on a switch.
Return to global configuration mode.
Switch(config-line)# exit
Enter the VLAN 1 interface subconfiguration mode using the interface vlan 1 command.
Switch(config)# interface vlan 1
From interface configuration mode, switch to line console subconfiguration mode using the line console 0 global configuration command.
Switch(config-if)# line console @
Return to privileged EXEC mode using the end command.


## Bagian 18
<!-- 2026-11-24 20:57:23 -->

2.2.7 Syntax Checker - Navigate Between IOS Modes
Use the Syntax Checker activity to navigate between IOS command lines on a switch.
Cc © VLAN eflaCe SUDCO GuraliOn Moge U G C ertace Via O and.
Switch(config)# interface vlan 1
From interface configuration mode, switch to line console subconfiguration mode using the line console 0 global configuration command.
Switch(config-if)# line console @
Return to privileged EXEC mode using the end command.
Switch(config-line)# end
You successfully navigated between the various IOS command line modes.


## Bagian 19
<!-- 2026-11-24 20:57:27 -->

2.2.8 Check Your Understanding - IOS Navigation
@ Instructions:
+ The exam consists of 4 questions and 70% is required to pass.
» You have unlimited attempts to pass the exam.
« You have no time limit per attempt to pass the exam.


## Bagian 20
<!-- 2026-11-24 20:57:31 -->

| BL BD PABA eT aa aj 7.
<@ >
Question 1
Which IOS mode allows access to all commands and features?
© Privileged EXEC mode
© Interface subconfiguration mode
© Line console subconfiguration mode
© _ Global configuration mode
1 of 4 Questions
Skip All Skip Question Submit


## Bagian 21
<!-- 2026-11-24 20:57:33 -->

< @ >

Question 1
Which IOS mode allows access to all commands and features?

O Privileged EXEC mode

© Interface subconfiguration mode

© Line console subconfiguration mode

O Global configuration mode

© | User EXEC mode

1 of 4 Questions
Skip All Skip Question Submit


## Bagian 22
<!-- 2026-11-24 20:57:53 -->

< @ >

Question 1
Which IOS mode allows access to all commands and features?

© Interface subconfiguration mode

© Line console subconfiguration mode

O Global configuration mode

© _ User EXEC mode

1 of 4 Questions
Skip All Skip Question Submit


## Bagian 23
<!-- 2026-11-24 20:57:56 -->

< la) @ >

Question 2
Which IOS mode are you in if the Switch(config)# prompt is displayed?

O Privileged EXEC mode

O _ Global configuration mode

© Interface subconfiguration mode

© _ User EXEC mode

O Line console subconfiguration mode

2 of 4 Questions
Skip All Skip Question Submit


## Bagian 24
<!-- 2026-11-24 20:58:10 -->

< |a) B >
Question 2
Which IOS mode are you in if the Switch(config)# prompt is displayed?
O Privileged EXEC mode
© Global configuration mode ,
© Interface subconfiguration mode
© _ User EXEC mode
O Line console subconfiguration mode
2 of 4 Questions


## Bagian 25
<!-- 2026-11-24 20:58:13 -->

« la) fe) & >

Question 3
Which IOS mode are you in if the Switch> prompt is displayed?

© Line console subconfiguration mode

© Interface subconfiguration mode

©O _ Global configuration mode

O Privileged EXEC mode

© | User EXEC mode

3 of 4 Questions
Skip All Skip Question Submit


## Bagian 26
<!-- 2026-11-24 20:58:26 -->

< lan) (az) (as a >

Question 4
Which two commands would return you to the privileged EXEC prompt regardless of the configuration mode you are in? (Choose two.)

CU) enable

Ol end

oO CTRL+Z

DO exit

disable

4 of 4 Ouestions
Skip All Skip Question Submit


## Bagian 27
<!-- 2026-11-24 20:58:57 -->

< at >

Question 4
Which two commands would return you to the privileged EXEC prompt regardless of the configuration mode you are in? (Choose two.)

oO CTRL+Z

Osexit

U disable

4 of 4 Ouestions
Suman suncucsion ERA)


## Bagian 28
<!-- 2026-11-24 20:59:07 -->

< ce) (Ra) >
Question 4
Which two commands would return you to the privileged EXEC prompt regardless of the configuration mode you are in? (Choose two.)
end
exit
disable


## Bagian 29
<!-- 2026-11-24 20:59:25 -->

< (on) (ae) (as) @ »

Ouestion 4
Which two commands would return you to the privileged EXEC prompt regardless of the configuration mode you are in? (Choose two.)

OU end

Osexit

U disable

oO CTRL+Z

4 of 4 Questions
Skip All Skip Question Submit


## Bagian 30
<!-- 2026-11-24 20:59:34 -->

< _ResutPage >
100%
You have scored 100%.
Congratulations, you have passed the exam.


## Bagian 31
<!-- 2026-11-24 20:59:55 -->

2.3.1 Basic IOS Command Structure
This topic covers the basic structure of commands for the Cisco IOS. A network administrator must know the basic IOS command
structure to be able to use the CLI for device configuration.
A Cisco IOS device supports many commands. Each IOS command has a specific format, or syntax, and can only be executed in the
appropriate mode. The general syntax for a command, shown in the figure, is the command followed by any appropriate keywords and
arguments.
Switch>show ip protocols
Keyword(s) or
Prompt Command Space y (s)
Argument(s)


## Bagian 32
<!-- 2026-11-24 21:00:33 -->

Switch>show ip protocols
Keyword(s) or
Command Space yword(s)
Argument(s)
Switch>ping 192.168.10.5
- Keyword - This is a specific parameter defined in the operating system (in the figure, ip protocols).
- Argument - This is not predefined; it is a value or variable defined by the user (in the figure, 192.168.10.5).
After entering each complete command, including any keywords and arguments, press the Enter key to submit the command to the
command interpreter.


## Bagian 33
<!-- 2026-11-24 21:01:03 -->

2.3.2 IOS Command Syntax Check
A command might require one or more arguments. To determine the keywords and arguments required for a command, refer to the
command syntax. The syntax provides the pattern, or format, that must be used when entering a command.
As identified in the table, boldface text indicates commands and keywords that are entered as shown. Italic text indicates an argument for
which the user provides the value.
Convention Description
boldface Boldface text indicates commands and keywords that you enter literally as shown.
italics Italic text indicates arguments for which you supply values.
[x] Square brackets indicate an optional element (keyword or argument).
{x} Braces indicate a required element (keyword or argument).
Braces and vertical lines within square brackets indicate a required choice within an optional element. Spaces are
Ixfy1z}] .
used to clearly delineate parts of the command.


## Bagian 34
<!-- 2026-11-24 21:02:01 -->

Nan used to clearly aelineate parts of the commana.
For instance, the syntax for using the description command is description string. The argument is a string value provided by the user.
The description command is typically used to identify the purpose of an interface. For example, entering the command, description
Connects to the main headguarter office switch, describes where the other device is at the end of the connection.
The following examples demonstrate conventions used to document and use IOS commands:
+ ping ip-address - The command is ping and the user-defined argument is the ip-address of the destination device. For example,
ping 10.10.10.5.
- traceroute jp-address - The command is traceroute and the user-defined argument is the jp-address of the destination device.
For example, traceroute 192.168.254.254.
Ifa command is complex with multiple arguments, you may see it represented like this:
Switch(config-if)# switchport port-security aging { static | time time | type {absolute |
inactivity}
The command will typically be followed with a detailed description of the command and each argument.
The Cisco IOS Command Reference is the ultimate source of information for a particular IOS command.


## Bagian 35
<!-- 2026-11-24 21:04:26 -->

Ifa command is complex with multiple arguments, you may see it represented like this:
Switch(config-if)# switchport port-security aging { static | time time | type {absolute |
inactivity}
The command will typically be followed with a detailed description of the command and each argument.
The Cisco IOS Command Reference is the ultimate source of information for a particular IOS command.
| 4 $ a
| ; Y | | \ 1 | > ~ yaaa, s.
H 1g i} eel = —
Ma - “. 1 . - . ~~
| J j L uu a “a 2 > . ~~ :
( 7 is 1 N A » : TA 1 :
is | - 4 TA \ 2 an ae
7 : , . SS
CPO es “Ta « “ 5, ai, "4
~ ” i ~ | ;
ta * i M


## Bagian 36
<!-- 2026-11-24 21:04:29 -->

The description command is typically used to identify the purpose of an interface. For example, entering the command, description
Connects to the main headguarter office switch, describes where the other device is at the end of the connection.
The following examples demonstrate conventions used to document and use IOS commands:
+ ping ip-address - The command is ping and the user-defined argument is the ip-address of the destination device. For example,
ping 10.10.10.5.
- traceroute jp-address - The command is traceroute and the user-defined argument is the jp-address of the destination device.
For example, traceroute 192.168.254.254.
Ifa command is complex with multiple arguments, you may see it represented like this:
Switch(config-if)# switchport port-security aging { static | time time | type {absolute |
inactivity}
The command will typically be followed with a detailed description of the command and each argument.
The Cisco IOS Command Reference is the ultimate source of information for a particular IOS command.


## Bagian 37
<!-- 2026-11-24 21:04:34 -->

2.3.3 IOS Help Features
The IOS has two forms of help available: context-sensitive help and command syntax check.
Context-sensitive help enables you to guickly find answers to these guestions:

+ Which commands are available in each command mode?

+ Which commands start with specific characters or group of characters?

+ Which arguments and keywords are available to particular commands?
To access context-sensitive help, simply enter a question mark, ?, at the CLI.
Command syntax check verifies that a valid command was entered by the user. When a command is entered, the command line
interpreter evaluates the command from left to right. If the interpreter understands the command, the requested action is executed, and
the CLI returns to the appropriate prompt. However, if the interpreter cannot understand the command being entered, it will provide
feedback describing what is wrong with the command.

R ; ‘ > = a, al ™~ f
| ey 1 SS 7 rer ,


## Bagian 38
<!-- 2026-11-24 21:05:54 -->

2.3.4 Video - Context Sensitive Help and Command Syntax
Check
Click Play in the figure to view a video demonstration of context-sensitive help and command syntax check.
Video - Context-Sensitive Help and Command Syntax Check
This video covers the following:
- Use the help command in user EXEC, privileged EXEC, and global config
modes
* Finish commands and ramen help command
» Use the command syntax checker syntax errors and incomplete
commands


## Bagian 39
<!-- 2026-11-24 21:10:05 -->

2.3.5 Hot Keys and Shortcuts
The IOS CLI provides hot keys and shortcuts that make configuring, monitoring, and troubleshooting easier.
Commands and keywords can be shortened to the minimum number of characters that identify a unigue selection. For example, the
configure command can be shortened to conf because configure is the only command that begins with conf. An even shorter version,
con, will not work because more than one command begins with con. Keywords can also be shortened.
The table lists keystrokes to enhance command line editing.

Keystroke Description

Tab Completes a partial command name entry.

Backspace Erases the character to the left of the cursor.

Ctrl+D Erases the character at the cursor.

Ctrl+K Erases all characters from the cursor to the end of the command line.

Esc D Erases all characters from the cursor to the end of the word.

Ctrl+U or Ctrl+X Erases all characters from the cursor back to the beginning of the command line.


## Bagian 40
<!-- 2026-11-24 21:10:52 -->

Ctrl+U or Ctrl+X Erases all characters from the cursor back to the beginning of the command line.

Ctrl-W Erases the word to the left of the cursor.

Ctri+A Moves the cursor to the beginning of the line.

Left Arrow or Ctrl+B Moves the cursor one character to the left.

Esc B Moves the cursor back one word to the left.

Esc F Moves the cursor forward one word to the right.

Right Arrow or Ctrl+F Moves the cursor one character to the right.

Ctri+E Moves the cursor to the end of command line.

Up Arrow or Ctrl+P Recalls the previous command in the history buffer, beginning with the most recent command.

Down Arrow or Ctrl+N Goes to the next line in the the history buffer.

Ctrl+R or Ctrl4l or Ctrl+L Redisplays the system prompt and command line after a console message is received.
Note: While the Delete key typically deletes the character to the right of the prompt, the IOS command structure does not recognize the
Nalata baw


## Bagian 41
<!-- 2026-11-24 21:11:20 -->

Ctrl+R or Ctrl4l or Ctrl+L Redisplays the system prompt and command line after a console message is received.
Note: While the Delete key typically deletes the character to the right of the prompt, the IOS command structure does not recognize the
Delete key.
When a command output produces more text than can be displayed in a terminal window, the IOS will display a “--More--” prompt. The
following table describes the keystrokes that can be used when this prompt is displayed.

Keystroke Description

Enter Key Displays the next line.

Space Bar Displays the next screen.

Any other key * Ends the display string, returning to previous prompt.

* Except "y", which answers "yes" to the --More-- prompt, and acts like the Space bar

This table lists commands used to exit out of an operation.

Keystroke Description


## Bagian 42
<!-- 2026-11-24 21:12:06 -->

This table lists commands used to exit out of an operation.
Keystroke Description
ctri-c When in any configuration mode, ends the configuration mode and returns to privileged EXEC mode. When in setup
mode, aborts back to the command prompt.

Ctrl-Z When in any configuration mode, ends the configuration mode and returns to privileged EXEC mode.
Ctrl-Shift-
6 " ' All-purpose break sequence used to abort DNS lookups, traceroutes, pings, etc.

| oH 3 NA 4

TK, a — 7

J l Hy Sea at > 2 =

| | & 1 TI oF 2 | 9
nd ‘ . " SS af
ee | 1 , © ~a 2, —5 PM ~~
$ d . : | ~ £2.


## Bagian 43
<!-- 2026-11-24 21:12:23 -->

2.3.6 Video - Hot Keys and Shortcuts
Click Play in the figure to view a video demonstration of the various hotkeys and shortcuts.
Video — Hot Keys and Shortcuts
This video will cover the following:

* Tab key (tab completion)

+ Command shortening

+ Up and down arrow key

* CTRL+C

“ CTRL+Z

+ CTRL + Shift + 6

* CTRL4+R


## Bagian 44
<!-- 2026-11-24 21:18:33 -->

2.3.7 Packet Tracer - Navigate the IOS
In this activity, you will practice skills necessary for navigating the Cisco IOS, including different user access modes, various configuration
modes, and common commands used on a regular basis. You will also practice accessing the context-sensitive help by configuring the
clock command.
B Navigate the IOS & Navigate the IOS
1 | \ . i > aa, >
N ,f wm"! | -
| | » = - = Me
| Cid ‘ aoe PA a =e Is % 7
eo K3 ea — Fr
4 | . + 1 4 “ . S « gr
d ee fk . Neng
(re | 4 : © tg i, —- PA .
» ~ 1 f »,


## Bagian 45
<!-- 2026-11-24 21:18:46 -->

2.3.8 Lab - Navigate the IOS by Using Tera Term for Console
Connectivity
Skills Practice Opportunity
You have the opportunity to practice the following skills:
- Part 1: Access a Cisco Switch through the Serial Console Port
- Part 2: Display and Configure Basic Device Settings
- Part 3: (Optional) Access a Cisco Router Using a Mini-USB Console Cable
You can practice these skills using the Packet Tracer or lab equipment, if available.
Packet Tracer - Physical Mode (PTPM)
B Navigate the IOS Using a Terminal Client for Console 5 Navigate the IOS Using a Terminal Client for Console
Connectivity - Physical Mode ™ Connectivity - Physical Mode
Lab Equipment


## Bagian 46
<!-- 2026-11-24 21:19:00 -->

- Part 1: Access a Cisco Switch through the Serial Console Port
- Part 2: Display and Configure Basic Device Settings
- Part 3: (Optional) Access a Cisco Router Using a Mini-USB Console Cable
You can practice these skills using the Packet Tracer or lab equipment, if available.
Packet Tracer - Physical Mode (PTPM)
B Navigate the IOS Using a Terminal Client for Console 5 Navigate the IOS Using a Terminal Client for Console
Connectivity - Physical Mode ™ Connectivity - Physical Mode
Lab Equipment
B Navigate the IOS by Using Tera Term for Console Connectivity


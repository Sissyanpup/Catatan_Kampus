## Bagian 1

<!-- 2026-11-24 19:37:54 -->

2.0.1 Why should I take this module?
Welcome to Basic Switch and End Device Configuration!
As part of your career in networking, you might have to set up a new network or maintain and upgrade an existing one. In either case,
you'll configure switches and end devices so that they are secure and perform effectively based on your requirements.
Out of the box, switches and end devices come with some general configuration. But for your particular network, switches and end
devices reguire your specific information and instructions. In this module, you will learn how to access Cisco IOS network devices. You
will learn basic configuration commands and use them to configure and verify a Cisco IOS device and an end device with an IP address.
Of course, there is much more to network administration, but none of that can happen without first configuring switches and end devices.
Let's get started!
i | . 1. = ~~
“| < ? "III NN: we,
‘ . . Nian “ |
(re | , © a \*, —- "4 3
» 1. ; 7 "3

## Bagian 2

<!-- 2026-11-24 19:38:13 -->

2.0.2 What will I learn to do in this module?
Module Title: Basic Switch and End Device Configuration
Module Objective: Implement initial settings including passwords, IP addressing, and default gateway parameters on a network switch
and end devices.
Topic Title Topic Objective
Cisco IOS Access Explain how to access a Cisco IOS device for configuration purposes.
IOS Navigation Explain how to navigate Cisco IOS to configure network devices.
The Command Structure Describe the command structure of Cisco IOS software.
Basic Device Configuration Configure a Cisco IOS device using CLI.
Save Configurations Use IOS commands to save the running configuration.
Ports and Addresses Explain how devices communicate across network media.
Configure IP Addressing Configure a host device with an IP address.

## Bagian 3

<!-- 2026-11-24 19:38:27 -->

Topic Title Topic Objective

Cisco IOS Access Explain how to access a Cisco IOS device for configuration purposes.
IOS Navigation Explain how to navigate Cisco IOS to configure network devices.

The Command Structure Describe the command structure of Cisco IOS software.

Basic Device Configuration Configure a Cisco IOS device using CLI.

Save Configurations Use IOS commands to save the running configuration.

Ports and Addresses Explain how devices communicate across network media.

Configure IP Addressing Configure a host device with an IP address.

Verify Connectivity Verify connectivity between two end devices.

## Bagian 4

<!-- 2026-11-24 19:38:34 -->

2.1.1 Operating Systems
All end devices and network devices reguire an operating system (OS). As shown in the figure, the portion of the OS that interacts
directly with computer hardware is known as the kernel. The portion that interfaces with applications and the user is known as the shell.
The user can interact with the shell using a command-line interface (CLI) or a graphical user interface (GUI).
Hardware

| \ \ User

| = | | Interface

| | | |

| | 0 e | | |

## Bagian 5

<!-- 2026-11-24 19:38:44 -->

de ws
« Shell - The user interface that allows users to request specific tasks from the computer. These requests can be made either through the CLI or GUI interfaces.
« Kernel - Communicates between the hardware and software of a computer and manages how hardware resources are used to meet software requirements.
« Hardware - The physical part of a computer including underlying electronics.
When using a CLI, the user interacts directly with the system in a text-based environment by entering commands on the keyboard at a
command prompt, as shown in the example. The system executes the command, often providing textual output. The CLI requires very
little overhead to operate. However, it does require that the user have knowledge of the underlying command structure that controls the
system.
analyst@secOps ~]$ 1s
Desktop Downloads lab.support.files second drive
[analyst@secOps ~]$

## Bagian 6

<!-- 2026-11-24 19:39:01 -->

A GUI such as Windows, macOS, Linux KDE, Apple iOS, or Android allows the user to interact with the system using an environment of
graphical icons, menus, and windows. The GUI example in the figure is more user-friendly and reguires less knowledge of the underlying
command structure that controls the system. For this reason, most users rely on GUI environments.
3
This PC
Recycle Bin
TE =
J,
PT.
PuTTY
(64-bit)

## Bagian 7

<!-- 2026-11-24 19:39:31 -->

However, GUls may not always be able to provide all the features available with the CLI. GUls can also fail, crash, or simply not operate as
specified. For these reasons, network devices are typically accessed through a CLI. The CLI is less resource intensive and very stable
when compared to a GUI.

The family of network operating systems used on many Cisco devices is called the Cisco Internetwork Operating System (IOS). Cisco IOS
is used on many Cisco routers and switches regardless of the type or size of the device. Each device router or switch type uses a
different version of Cisco IOS. Other Cisco operating systems include IOS XE, IOS XR, and NX-OS.

Note: The operating system on home routers is usually called firmware. The most common method for configuring a home router is by
using a web browser-based GUI.

Ni. “yf NYALI 3 | —
IA POLA Se >
' | | »\* = - > “ Ma

J 7 “ ¥ & , \* - Tm = — 7 — aga » i . .
| iY tf ~ A h » “ "Gu - 7 , - N
, | KKNI S Sees: ge
‘ . ‘ va “ 1 |
P3 . 4 ‘ . my, = i

## Bagian 8

<!-- 2026-11-24 19:39:50 -->

2.1.3 Purpose of an OS
Network operating systems are similar to a PC operating system. Through a GUI, a PC operating system enables a user to do the
following:

- Use a mouse to make selections and run programs

- Enter text and text-based commands

- View output on a monitor
  A CLI-based network operating system (e.g., the Cisco IOS on a switch or router) enables a network technician to do the following:

. Use a keyboard to run CLI-based network programs

- Use a keyboard to enter text and text-based commands

- View output on a monitor
  Cisco networking devices run particular versions of the Cisco IOS. The IOS version is dependent on the type of device being used and
  the required features. While all devices come with a default IOS and feature set, it is possible to upgrade the IOS version or feature set to
  obtain additional capabilities.
  The figure displays a list of IOS software releases for a Cisco Catalyst 2960 Switch.
  Cisco Software Download Example

## Bagian 9

<!-- 2026-11-24 19:40:13 -->

Cisco Software Download Example
« C QQ) @ software.cisco.com/download/home/27996337 5/type/280805680/release/12.2.55-SE12?i=!pp Qxr
fats Products & Services Support How to Buy Training & Events Partners Bob Vachon @ @ (2) 0 eo
cisco (0)
Software Download
Downloads Home / Switches / Campus LAN Switches - Access / Catalyst 2960 Series Switches / Catalyst 2960-24TC-L Switch / IOS Software- 12.2.55-SE12(MD)
“au =
(& searcn ) Catalyst 2960-24TC-L Switch
( Expand Ali | Collapse All ) Release 12.2.55-SE12 MD Related Links and Documentation
, Release Notes tor 12.2(55)SE12
(10) Write | Read reviews
Suggested Release Vv A My Notincations
Latest Release Vv
File Information Release Date DRAM/FLASH
15.0.2-SE11(MD)
LAN BASE @ 09-Oct-2017 64/32 + xv
12.2.55-SE12(MD) ¢2960-lanbasek9-mz.122-55.SE12.bin
Inu Relosea wy LAN BASE WITH WEB BASED DEV MGR 09-Oct-2017 64/32 Ae
c2960-lanbasek9-tar.122-55.SE12.tar

## Bagian 10

<!-- 2026-11-24 19:40:27 -->

2.1.4 Access Methods
A switch will forward traffic by default and does not need to be explicitly configured to operate. For example, two configured hosts
connected to the same new switch would be able to communicate.
Regardless of the default behavior of a new switch, all switches should be configured and secured.
Method Description
This is a physical management port that provides out-of-band access to a Cisco device. Out-of-band access refers
to access via a dedicated management channel that is used for device maintenance purposes only. The advantage of
Console using a console port is that the device is accessible even if no networking services are configured, such as
performing the initial configuration. A computer running terminal emulation software and a special console cable to
connect to the device are required for a console connection.
Secure SSH is an in-band and recommended method for remotely establishing a secure CLI connection, through a virtual
Shell interface, over a network. Unlike a console connection, SSH connections reguire active networking services on the
(SSH) device, including an active interface configured with an address. Most versions of Cisco IOS include an SSH server
and an SSH client that can be used to establish SSH sessions with other devices.
Telnet is an insecure, in-band method of remotely establishing a CLI session, through a virtual interface, over a
Telnet network. Unlike SSH, Telnet does not provide a secure, encrypted connection and should only be used in a lab
environment. User authentication, passwords, and commands are sent over the network in plaintext. The best

## Bagian 11

<!-- 2026-11-24 19:40:54 -->

metnoa vescription
This is a physical management port that provides out-of-band access to a Cisco device. Out-of-band access refers
to access via a dedicated management channel that is used for device maintenance purposes only. The advantage of
Console using a console port is that the device is accessible even if no networking services are configured, such as
performing the initial configuration. A computer running terminal emulation software and a special console cable to
connect to the device are required for a console connection.
Secure SSH is an in-band and recommended method for remotely establishing a secure CLI connection, through a virtual
Shell interface, over a network. Unlike a console connection, SSH connections reguire active networking services on the
(SSH) device, including an active interface configured with an address. Most versions of Cisco IOS include an SSH server
and an SSH client that can be used to establish SSH sessions with other devices.
Telnet is an insecure, in-band method of remotely establishing a CLI session, through a virtual interface, over a
Telnet network. Unlike SSH, Telnet does not provide a secure, encrypted connection and should only be used in a lab
environment. User authentication, passwords, and commands are sent over the network in plaintext. The best
practice is to use SSH instead of Telnet. Cisco IOS includes both a Telnet server and Telnet client.
Note: Some devices, such as routers, may also support a legacy auxiliary port that was used to establish a CLI session remotely over a
telephone connection using a modem. Similar to a console connection, the AUX port is out-of-band and does not require networking
services to be configured or available.

## Bagian 12

<!-- 2026-11-24 19:41:02 -->

2.1.5 Terminal Emulation Programs
There are several terminal emulation programs you can use to connect to a networking device either by a serial connection over a
console port, or by an SSH/Telnet connection. These programs allow you to enhance your productivity by adjusting window sizes,
changing font sizes, and changing color schemes.
PuTTY Tera Term SecureCRT
» PuTTY Configuration ? x
Category:
=} Session Basic options for your PUTTY session

- Logging
  5 : Specify the destination you want to connect to
  =| Terminal ly y
- Keyboard Host Name (or IP address) Port
  Rall | an

## Bagian 13

<!-- 2026-11-24 19:41:17 -->

88 PuTTY Configuration ? x
23 Category:
aa =} Session Basic options for your PUTTY session
3 Bata Le Specify the destination you want to connect to
Keyboard Host Name (or IP address) Port
ree ee |e
Features é Na
=} Window onnection 5
| Appearance ORaw (Telnet ()RIogin @SSH (©) Serial
i Behaviour Load, save or delete a stored session
ore Translation
8 Selection Saved Sessions
ora =}. Connection : =
\_Data Default Settings Load
ors - Proxy
ova Telnet Save
~Rlogin ;
012 Serial
Close window on exit:
O)Always ()Never (@)Only onclean exit

## Bagian 14

<!-- 2026-11-24 19:41:23 -->

\_— — ta
os 88 PuTTY Configuration ? x
aie Category:
=} Session Basic options for your PUTTY session
= Bata Le Specify the destination you want to connect to
Keyboard Host Name (or IP address) Port
rea ee |
Features é Na
=} Window onnection 5
| Appearance ORaw (OTelnet ()Rlogin @)SSH (Serial
i Behewour Load, save or delete a stored session
ora Translation
Selection Saved Sessions
ors =} Connection -
' Data Default Settings Load
“ ~ Proxy
ore Telnet Save
~Rlogin ;
ia (B SSH Delete |
or Serial
Close window on exit:
O)Always ()Never (@)Only onclean exit

## Bagian 15

<!-- 2026-11-24 19:41:27 -->

Pully fers term securecnt
es)
aa & PuTTY Configuration ? x
ae Category
=} Session Basic options for your PUTTY session
eat Specify the destinati tt tt
5 Terminal pecify the destination you want to connect to

- Keyboard Host Name (or IP address) Port
- Beli | |z2
- Features : :
  =| Window CETREELE ype: .
  Appearance ORaw (OTelnet C)Riogin @)SSH (©) Serial
  ‘ia | Benavou Load, save or delete a stored session
  : - Translation
  ‘ii (+ Selection Saved Sessions
  | - Colours
  “3 =} Connection -
  os -Data Default Settings Load
- Proxy
  “e -Telnet Save
  Jia - Rlogin
  SSH Delete
  oe Serial
  Close window on exit:
  (DAways (©)Never (@)Onlyonclean exit
- — = =
  » “
  | bara |
  A .
  Se Se re 4 5 e / -

## Bagian 16

<!-- 2026-11-24 19:41:33 -->

- — PuTTy Tera Term SecureCRT
  ara
  n
  U Tera Terre New connection BK A
  @TCPNP Host: | v
  an M History
  Service: O Telnet TCP ports: |22
  “ @SSH SSHversion: SSH2 — -
  oe O Other
  Protocol: UNSPEC ~
  ~ Serial r
  23 Cancel Help
  1 + . AN 3
  || 1 > >"
  | ‘ - a =~ -
  . - -= = Ng 7
  .
  . 4 - - ~ ~ . <<. x
  : 1 NN ~ - NN An a)
  ~ . 8 2 Tn ;
  3 2 s . ma 4 4
  . > . Li , FN -

* - 2 >» — 3 .
    | 4 Li Ka “= 1 7 f

## Bagian 17

<!-- 2026-11-24 19:41:36 -->

313 File Edit View Options Transfer Script Tools Window Help
. of ¥ i 2 Enter host <Alt+R> IDoAkeser?B .

Ia)

2

» Tn

S Quick Connect

5

Fy

2 Protocol: SSH2 Ed

8

(7

= Hostname:

Port: [22 | Firewall: None v
ae
Username:
Authentication
i MA Publickey | DI Ropers
. KA Keyboard Interactive 2. KA GSSAPI
ait J
22 (Show quick connect on startup [V) Save session
ora Ml open In a tab
Connect Cancel
Ready 0,0 0 Rows, 0 Cols CAPN os
. -
. x
» bad b ,
A . oi > v /

## Bagian 18

<!-- 2026-11-24 19:41:42 -->

: kK. | 8. , “
ie Ik , | 1... » J
, t | : ‘ “
‘ hi | . i t | : > a . o $ “aa
iS Sf ite? <a)
TN / 4 at Pn eed se " 1
| ‘ fr ~ yaa i TT ” \_\* 4 j $
‘be / = = -. 2 1
| | a | : . ". Au
21.6 Check Your Understanding - Cisco IOS Access
@ Instructions:

- The exam consists of 4 questions and 70% is required to pass.
  » You have unlimited attempts to pass the exam.
  » You have no time limit per attempt to pass the exam.

## Bagian 19

<!-- 2026-11-24 19:41:48 -->

« @ >

Question 1
Which access method would be most appropriate if you were in the equipment room with a new switch that needs to be configured?

DO Console

© Telnet/SSH

DOD Aux

1 of 4 Questions
Skip All Skip Question Submit

## Bagian 20

<!-- 2026-11-24 19:41:59 -->

< @ >
Question 1
Which access method would be most appropriate if you were in the equipment room with a new switch that needs to be configured?
© Telnet/SSH
DOD Aux
1 of 4 Questions

## Bagian 21

<!-- 2026-11-24 19:42:02 -->

< lo) B >

Question 2
Which access method would be most appropriate if your manager gave you a special cable and told you to use it to configure the switch?

O\_ Console

© Telnet/SSH

DOD Aux

2 of 4 Questions
Skip All Skip Question Submit

## Bagian 22

<!-- 2026-11-24 19:42:08 -->

« ta) >
Question 2
Which access method would be most appropriate if your manager gave you a special cable and told you to use it to configure the switch?
O _ Console
@© _ Telnet/SSH
DOD Aux
2 of 4 Questions

## Bagian 23

<!-- 2026-11-24 19:42:17 -->

K lal |a2 KS >

Question 3
Which access method would be the most appropriate in-band access to the IOS over a network connection?

DOD Aux

© Telnet/SSH

DO Console

3 of 4 Questions
Skip All Skip Question Submit

## Bagian 24

<!-- 2026-11-24 19:42:28 -->

XK lal laz| Jas ry >

Question 4
Which access method would be the most appropriate if you call your manager to tell him you cannot access your router in another city
over the internet and he provides you with the information to access the router through a telephone connection?

DO Console

DOD Aux

© Telnet/SSH

4 of 4 Questions
Skip All Skip Question Submit

## Bagian 25

<!-- 2026-11-24 19:42:36 -->

< | Resutpaga »
( 9,
25%
You have scored 25%.
You have not passed the exam.
Select Reset to retake the exam. Remember that you can return to the module for reference or to retake the exam at any time.

## Bagian 26

<!-- 2026-11-24 19:42:40 -->

1 \* - an. ” ae
| \_ =,
| | It | . Ei. M /
< >
Question 1
Which access method would be most appropriate if you were in the equipment room with a new switch that needs to be configured?
DOD Aux
© Telnet/SSH
DO Console
1 of 4 Questions
Skip All Skip Question Submit

## Bagian 27

<!-- 2026-11-24 19:42:48 -->

|
| 513 +3 4 | | =
< @ >
Question 1
Which access method would be most appropriate if you were in the equipment room with a new switch that needs to be configured?
© Telnet/SSH
DO Console
1 of 4 Questions
Skip All Skip Question Submit

## Bagian 28

<!-- 2026-11-24 19:43:09 -->

< {a1} (22) fas| (aa) MR >
(—\_ |
50%
You have scored 50%.
You have not passed the exam.
Select Reset to retake the exam. Remember that you can return to the module for reference or to retake the exam at any time.

## Bagian 29

<!-- 2026-11-24 19:43:15 -->

Aa 1 Oo >
Question 1
Which access method would be most appropriate if you were in the equipment room with a new switch that needs to be configured?
Telnet/SSH
Console

## Bagian 30

<!-- 2026-11-24 19:43:24 -->

— — = , = —\_— ss AA
< @ >

Question 1
Which access method would be most appropriate if you were in the equipment room with a new switch that needs to be configured?

DOD Aux

© Telnet/SSH

1 of 4 Questions
Skip All Skip Question Submit

## Bagian 31

<!-- 2026-11-24 19:43:27 -->

Ka 2 >

Question 2
Which access method would be most appropriate if your manager gave you a special cable and told you to use it to configure the switch?

© Telnet/SSH

O\_ Console

DOD Aux

2 of 4 Questions
Skip All Skip Question Submit

## Bagian 32

<!-- 2026-11-24 19:43:33 -->

IT) - .
JO nw VY Vie veri aa aj...
K lal jaz KI >
Question 3
Which access method would be the most appropriate in-band access to the IOS over a network connection?
DO Console
DOD Aux
© Telnet/SSH
3 of 4 Questions
Skip All Skip Question Submit

## Bagian 33

<!-- 2026-11-24 19:43:47 -->

< | ResutPage »
100%
You have scored 100%.
Congratulations, you have passed the exam.

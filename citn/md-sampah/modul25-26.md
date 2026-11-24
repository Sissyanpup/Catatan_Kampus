
## Bagian 1
<!-- 2026-11-24 22:07:18 -->

2.5.1 Configuration Files

You now know how to perform basic configuration on a switch, including passwords and banner messages. This topic will show you how
to save your configurations.

There are two system files that store the device configuration:

+ Startup-config - This is the saved configuration file that is stored in NVRAM. It contains all the commands that will be used by the
device upon startup or reboot. Flash does not lose its contents when the device is powered off.

+ running-config - This is stored in Random Access Memory (RAM). It reflects the current configuration. Modifying a running
configuration affects the operation of a Cisco device immediately. RAM is volatile memory. It loses all of its content when the device
is powered off or restarted.

The show running-config privileged EXEC mode command is used to view the running config. As shown in the example, the command
will list the complete configuration currently stored in RAM.

Sw-Floor-1# show running-config

Building configuration...

Current configuration : 1351 bytes

!

! Last configuration change at 00:01:28 UTC Mon Mar 1 1993

!

version 15.8

no service pad


## Bagian 2
<!-- 2026-11-24 22:07:46 -->

will list the complete configuration currently stored in RAM.

Sw-Floor-1# show running-config

Building configuration...

Current configuration : 1351 bytes

!

! Last configuration change at 00:01:28 UTC Mon Mar 1 1993

!

version 15.8

no service pad

service timestamps debug datetime msec

service timestamps log datetime msec

service password-encryption

!

hostname Sw-Floor-1

!

(output omitted)
To view the startup configuration file, use the show startup-config privileged EXEC command.
If power to the device is lost, or if the device is restarted, all configuration changes will be lost unless they have been saved. To save
changes made to the running configuration to the startup configuration file, use the copy running-config startup-config privileged EXEC
mode command.


## Bagian 3
<!-- 2026-11-24 22:08:12 -->

2.5.2 Alter the Running Configuration

If changes made to the running config do not have the desired effect and the running-config has not yet been saved, you can restore the
device to its previous configuration. Remove the changed commands individually, or reload the device using the reload privileged EXEC
mode command to restore the startup-config.

The downside to using the reload command to remove an unsaved running config is the brief amount of time the device will be offline,
causing network downtime.

When a reload is initiated, the IOS will detect that the running config has changes that were not saved to the startup configuration. A
prompt will appear to ask whether to save the changes. To discard the changes, enter n or no.

Alternatively, if undesired changes were saved to the startup config, it may be necessary to clear all the configurations. This requires
erasing the startup config and restarting the device. The startup config is removed by using the erase startup-config privileged EXEC
mode command. After the command is issued, the switch will prompt you for confirmation. Press Enter to accept.

After removing the startup config from NVRAM, reload the device to remove the current running config file from RAM. On reload, a switch
will load the default startup config that originally shipped with the device.


## Bagian 4
<!-- 2026-11-24 22:11:02 -->

2.5.3 Video - Alter the Running Configuration
Click Play in the figure to view a video demonstration on how to save switch configuration files.
Video - Alter the Running Configuration
This video covers the following:
- Copy the running-config file to the startup-config file
- Show the files in the flash or irectory
- Use command shortening
- Erase the startup-config file
- Copy the startup-config file to the running-config file


## Bagian 5
<!-- 2026-11-24 22:11:47 -->

Color Opacity
Text Edge Style
Text Background
Color Opacity .
Font Family
Proportional Sans-Serif v
Caption Area Background
Color Opacity
Transcript
Follow along using the transcript.
ST


## Bagian 6
<!-- 2026-11-24 22:17:06 -->

2.5.4 Capture Configuration to a Text File
Configuration files can also be saved and archived to a text document. This seguence of steps ensures that a working copy of the
configuration file is available for editing or reuse later.
For example, assume that a switch has been configured, and the running config has been saved on the device.
Step 1. Open terminal emulation software, such as PuTTY or Tera Term, that is already connected to a switch.
Category:
=} Session Basic options for your PuTTY session
_ «Logging
i ; Specify the destination you want to connect to
=| Terminal 5 y
_ » Keyboard Host Name (or IP address) Port
Features ;
5 Window Connection type:
| L- Appearance ()Raw (_)Telnet ()Rlogin @)SSH_ (_) Serial


## Bagian 7
<!-- 2026-11-24 22:17:20 -->

& PuTTY Configuration ?
Category:
a Session Basic options for your PUTTY session
4 nec Specify the destination you want to connect to
«Keyboard Host Name (or IP address) Port
| Features Cc =
=) Window onnection
Appearance (Raw (_)Telnet ()Rlogin @)SSH (_) Serial
| | aa Load, save or delete a stored session
EB Selection Saved Sessions
=) Connection
Data Default Settings Load |
Telnet |. Save |
- Rlogin ———
HH SSH Delete


## Bagian 8
<!-- 2026-11-24 22:17:24 -->

Category:
=} Session Basic options for your PUTTY session
Lema” Specify the destination you want to connect to
— Keyboard Host Name (or IP address) Port
“ Bel Ng |
ere Features a er
= Window onnection type:
ars | L Appearance © Raw ()Telnet ©)Riogin @)SSH ()Serial
“ on Load, save or delete a stored session
Ki "8 Selection Saved Sessions
=} Connection : ,
Data Default Settings Load
Proxy
Telnet Save
Rlogin |
SSH Delete
013 Serial
03 Close window on exit:
(DAways ()Never  (@Oniyon clean exit
About Help Open Cancel


## Bagian 9
<!-- 2026-11-24 22:17:27 -->

28 PuTTY Configuration ? x
Category:
= =} Session Options controlling session logging |
ii Logging
ore &} Terminal Session logging:
__~Keyboard () None (O Printable output
as ee @)Allsession output (O SSH packets
“ 4 Wanda (SSH packets and raw data
ia Appearance Log file name:
215 Behaviour MySwitchLogs Browse...
Translation
| Selection (Log file name can contain &Y, &M, &D for date, &T for
Colours time, &H for host name, and &P for port number)
Connection What to do if the log file already exists:
Data © Always overwrite it
Proxy © Always append to the end of it
3 Telnet (@) Ask the user every time
ore Rlogin Flush log file frequently
Rel
SSH Include header
012 Serial
ove Options specific to SSH packet logging
Omit known password fields
| ] Omit session data


## Bagian 10
<!-- 2026-11-24 22:17:54 -->

Step 2. Enable logging in the terminal software and assign a name and file location to save the log file. The figure displays that All
session output will be captured to the file specified (i.e., MySwitchLogs).
» PuTTY Configuration ? xX
Category:
=} Session Options controlling session logging
_ - Logging
= Terminal Session logging:
| - Keyboard __() None () Printable output
i ee (@) All session output (SSH packets
| Features ‘
=. Window (-) SSH packets and raw data
| Behaviour MySwitchLogs Browse...
— ~ Translation —
| Selection (Log file name can contain &Y, &M, &D for date, &T for
) Colours time, &H for host name, and &P for port number)
=) Connection What to do if the log file already exists:
Data () Always overwrite it
- Proxy (D Always append to the end of it
Telnet (@) Ask the user every time
~ Rlogin Flush log file frequently
H SSH al ra Pre


## Bagian 11
<!-- 2026-11-24 22:18:06 -->

Options specific to SSH packet logging
Omit known password fields
|. Jomit session data

Step 3. Execute the show running-config or show startup-config command at the privileged EXEC prompt. Text displayed in the

terminal window will be placed into the chosen file.
Sw-Floor-1# show running-config
Building configuration...

(output omitted)

Step 4. Disable logging in the terminal software. The figure shows how to disable logging by choosing the None session logging option.
2 PuTTY Configuration ? xX
Category:

=} Session Options controlling session logging
Logging
—| Terminal Session logging:


## Bagian 12
<!-- 2026-11-24 22:18:12 -->

2 PuTTY Configuration ? x
Category:

=} Session Options controlling session logging
| «Logging —
=} Terminal — Session logging:
|» Keyboard (@ None (O Printable output
| ne ~ (OAI session output () SSH packets
| Features
= Window () SSH packets and raw data
|» Behaviour MySwitchLogs Browse...
_ « Translation
| Selection (Log file name can contain &Y, &M, &D for date, &T for
| Colours time, &H for host name, and &P for port number)
=} Connection What to do if the log file already exists:

~-Data () Always overwrite it

.- Proxy () Always append to the end of it

Telnet (@) Ask the user every time

~ Rlogin Flush log file frequently

i SSH Include header

~~ Serial

Options specific to SSH packet logging
Omit known password fields


## Bagian 13
<!-- 2026-11-24 22:18:16 -->

Options specific to SSH packet logging
Omit known password fields
|. Jomit session data
The text file created can be used as a record of how the device is currently implemented. The file could require editing before being used
to restore a saved configuration to a device.
To restore a configuration file to a device:
Step 1. Enter global configuration mode on the device.
Step 2. Copy and paste the text file into the terminal window connected to the switch.
The text in the file will be applied as commands in the CLI and become the running configuration on the device. This is a convenient
method of manually configuring a device.
. ‘ -
(re 1 ‘ ’ © “3 ¥) ---p "4 ’
| » “ . ii
| < > ‘ | :


## Bagian 14
<!-- 2026-11-24 22:18:28 -->

i | > ' - 8
af) “a ’ els Pee <<
. 4 *
2.5.5 Packet Tracer - Configure Initial Switch Settings
In this activity, you will perform basic switch configurations. You will secure access to the CLI and console ports using encrypted and
plaintext passwords. You will learn how to configure messages for users logging into the switch. These banners are also used to warn
unauthorized users that access is prohibited.
B Configure Initial Switch Settings % Configure Initial Switch Settings


## Bagian 15
<!-- 2026-11-24 22:18:45 -->

2.6.1 IP Addresses
Congratulations, you have performed a basic device configuration! Of course, the fun is not over yet. If you want your end devices to
communicate with each other, you must ensure that each of them has an appropriate IP address and is correctly connected. You will learn
about IP addresses, device ports and the media used to connect devices in this topic.
The use of IP addresses is the primary means of enabling devices to locate one another and establish end-to-end communication on the
internet. Each end device on a network must be configured with an IP address. Examples of end devices include these:

- Computers (work stations, laptops, file servers, web servers)

+ Network printers

- VoIP phones

- Security cameras

- Smart phones

- Mobile handheld devices (such as wireless barcode scanners)
The structure of an IPv4 address is called dotted decimal notation and is represented by four decimal numbers between 0 and 255. IPv4
addresses are assigned to individual devices connected to a network.
Note: IP in this course refers to both the IPv4 and IPv6 protocols. IPv6 is the most recent version of IP and is replacing the more common
IPv4.
With the IPv4 address, a subnet mask is also necessary. An IPv4 subnet mask is a 32-bit value that differentiates the network portion of
the address from the host portion. Coupled with the IPv4 address, the subnet mask determines to which subnet the device is a member.
The example in the figure displays the IPv4 address (192.168.1.10), subnet mask (255.255.255.0), and default gateway (192.168.1.1)
assigned to a host. The default gateway address is the IP address of the router that the host will use to access remote networks,


## Bagian 16
<!-- 2026-11-24 22:21:55 -->

Note: IP in this course refers to both the IPv4 and IPv6 protocols. IPv6 is the most recent version of IP and is replacing the more common
IPv4.
With the IPv4 address, a subnet mask is also necessary. An IPv4 subnet mask is a 32-bit value that differentiates the network portion of
the address from the host portion. Coupled with the IPv4 address, the subnet mask determines to which subnet the device is a member.
The example in the figure displays the IPv4 address (192.168.1.10), subnet mask (255.255.255.0), and default gateway (192.168.1.1)
assigned to a host. The default gateway address is the IP address of the router that the host will use to access remote networks,
including the internet.
Internet Protocol Version 4 (TCP/IPv4) Properties x
General
You can get IP settings assigned automatically if your network supports
this capability. Otherwise, you need to ask your network administrator
for the appropriate IP settings.
() Obtain an IP address automatically
@) Use the following IP address:
IP address: 192.168. 1 . 10


## Bagian 17
<!-- 2026-11-24 22:22:10 -->

Sneed
You can get IP settings assigned automatically if your network supports
vs this capability. Otherwise, you need to ask your network administrator
for the appropriate IP settings.
“ CO Obtain an IP address automatically
1 @ Use the following IP address:
os IP address: 192.168. 1 . 10
we Subnet mask: 255.255.255. 0
Default gateway: 192.368. 2. 1
are Obtain DNS server address automatically
ia @ Use the following DNS server addresses:
(Validate settings upon exit | Mei |
Lx || can
IPvG addresses are 128 bits In length and written as 3 string of hexadecimal values. Every four bits Is represented by 3 single
hexadecimal digit: for 3 total of 32 hexadecimal values. Groups of four hexadecimal digits are seperated by 3 colon (:) . IPv6 addresses
Internet Protocol Version 6 (TCP/IPv6) Properties x
General


## Bagian 18
<!-- 2026-11-24 22:22:16 -->

| Lx) cma |
IPv6 addresses are 128 bits in length and written as a string of hexadecimal values. Every four bits is represented by a single
hexadecimal digit; for a total of 32 hexadecimal values. Groups of four hexadecimal digits are separated by a colon (:) . IPv6 addresses
are not case-sensitive and can be written in either lowercase or uppercase.
Internet Protocol Version 6 (TCP/IPv6) Properties x
General
You can get IPv6 settings assigned automatically if your network supports this capability.
Otherwise, you need to ask your network administrator for the appropriate IPv6 settings.
© Obtain an IPv6 address automatically
(@ Use the following IPv6 address:
IPv6 address: 200 1:db8:acad: 10:: 10
Subnet prefix length:
Default gateway: fe80::1


## Bagian 19
<!-- 2026-11-24 22:22:29 -->

beneral
You can get IPv6 settings assigned automatically if your network supports this capability.
Otherwise, you need to ask your network administrator for the appropriate IPv6 settings.
© Obtain an IPv6 address automatically
@ Use the following IPv6 address:
IPv6 address: 200 1:db8:acad: 10::10
Subnet prefix length:
Default gateway: fe80::1
Obtain DNS server address automatically
@) Use the following DNS server addresses:
[_] Validate settings upon exit wa |
I ae | - |


## Bagian 20
<!-- 2026-11-24 22:22:35 -->

2.6.2 Interfaces and Ports
Network communications depend on end user device interfaces, networking device interfaces, and the cables that connect them. Each
physical interface has specifications, or standards, that define it. A cable connecting to the interface must be designed to match the
physical standards of the interface. Types of network media include twisted-pair copper cables, fiber-optic cables, coaxial cables, or
wireless, as shown in the figure.
Copper
SS SS ee, Ki a
ca EA Fiber-optics
Pn =
ae "4 -
Wireless
| v. hh


## Bagian 21
<!-- 2026-11-24 22:25:34 -->

os di —S>
“4 E “ F bh La
Wireless
‘
ng,

Different types of network media have different features and benefits. Not all network media have the same characteristics. Not all media
are appropriate for the same purpose. These are some of the differences between various types of media:

. Distance the media can successfully carry a signal

+ Environment in which the media is to be installed

- Amount of data and the speed at which it must be transmitted

- Cost of the media and installation
Not only does each link on the internet require a specific network media type, but each link also requires a particular network technology.
For example, Ethernet is the most common local-area network (LAN) technology used today. Ethernet ports are found on end-user
devices, switch devices, and other networking devices that can physically connect to the network using a cable.
Cisco IOS Layer 2 switches have physical ports for devices to connect. These ports do not support Layer 3 IP addresses. Therefore,
switches have one or more switch virtual interfaces (SVIs). These are virtual interfaces because there is no physical hardware on the


## Bagian 22
<!-- 2026-11-24 22:26:03 -->

are appropriate for the same purpose. These are some of the differences between various types of media:
. Distance the media can successfully carry a signal
+ Environment in which the media is to be installed
- Amount of data and the speed at which it must be transmitted
- Cost of the media and installation
Not only does each link on the internet require a specific network media type, but each link also requires a particular network technology.
For example, Ethernet is the most common local-area network (LAN) technology used today. Ethernet ports are found on end-user
devices, switch devices, and other networking devices that can physically connect to the network using a cable.
Cisco IOS Layer 2 switches have physical ports for devices to connect. These ports do not support Layer 3 IP addresses. Therefore,
switches have one or more switch virtual interfaces (SVIs). These are virtual interfaces because there is no physical hardware on the
device associated with it. An SVI is created in software.
The virtual interface lets you remotely manage a switch over a network using IPv4 and IPv6. Each switch comes with one SVI appearing in
the default configuration "out-of-the-box." The default SVI is interface VLAN1.
Note: A Layer 2 switch does not need an IP address. The IP address assigned to the SVI is used to remotely access the switch. An IP
address is not necessary for the switch to perform its operations.
1/ « 1 = eo . _ “Ss Neer > Ce »
CU HA ~ 2 : TU . “wc- = J .
é M ‘ : Aa
ne: » " " © -a 7 ff h
h ~ : ;


## Bagian 23
<!-- 2026-11-24 22:26:09 -->

II EY banana AA II Tan Jaa. as
< @ >
Question 1
What is the structure of an IPv4 address called?
© _Dotted-binary format
© __Dotted-decimal format
O Dotted-hexadecimal format
1 of 3 Questions
Skip All Skip Question Submit


## Bagian 24
<!-- 2026-11-24 22:26:17 -->

II BM PABA ee AYU Tan —— . ee
< al & >
Question 2
How is an IPv4 address represented?
O Four binary numbers between 0 and 1 separated by colons.
O Thirty-two hexadecimal numbers separated by periods.
O Thirty-two hexadecimal numbers separated by colons.
O Four decimal numbers between 0 and 255 separated by periods.
2 of 3 Questions
Skip All Skip Question Submit


## Bagian 25
<!-- 2026-11-24 22:26:25 -->

EL BM banana ANU Tang saw oo ee
K fail {a 3, >
Question 3
What type of interface has no physical port associated with it?
O Ethernet
O Console
O Serial
Switch virtual interface (SVI)
3 of 3 Questions
Skip All Skip Question Submit


## Bagian 26
<!-- 2026-11-24 22:26:54 -->

BR bagan eee JA . au
Submit My Assessment
Are you sure you want to submit the guiz?
(2 Yes, confirm my submission.
Submit


## Bagian 27
<!-- 2026-11-24 22:26:58 -->

| BL BP ANC eee an s——m vj www
< (aj fe) [cs] EA >
Question 3
What type of interface has no physical port associated with it?
Ethernet
Console
| x Serial ,
Switch virtual interface (SVI)


## Bagian 28
<!-- 2026-11-24 22:27:12 -->

AC MUA L BNN UNA NN om 3
i 1 - fi — i >.
100%
You have scored 100%.
Congratulations, you have passed the exam.


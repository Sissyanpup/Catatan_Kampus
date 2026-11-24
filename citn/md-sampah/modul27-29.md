## Bagian 1

<!-- 2026-11-24 22:28:25 -->

2.7.1 Manual IP Address Configuration for End Devices
Much like you need your friends’ telephone numbers to text or call them, end devices in your network need an IP address so that they can
communicate with other devices on your network. In this topic, you will implement basic connectivity by configuring IP addressing on
switches and PCs.
IPv4 address information can be entered into end devices manually, or automatically using Dynamic Host Configuration Protocol (DHCP).
To manually configure an IPv4 address on a Windows host, open the Control Panel > Network Sharing Center > Change adapter
settings and choose the adapter. Next right-click and select Properties to display the Local Area Connection Properties, as shown in
the figure.

4% Ethernet Properties x

Networking Sharing

Connect using:
[Realtek PCle GBE Family Controller

## Bagian 2

<!-- 2026-11-24 22:28:39 -->

W Ethernet Properties x

Networking Sharing
sie Connect using:
“ IM Realtek PCle GBE Family Controller
ii This connection uses the following items:
. QoS Packet Scheduler A

#'@ Intemet Protocol Version 4 (TCP/IPv4)

L] .» Microsoft Network Adapter Multiplexor Protocol

a. Microsoft LLDP Protocol Driver

2 Intemet Protocol Version 6 (TCP/IPv6)

. Link-Layer Topology Discovery Responder
012 . Link-Layer Topology Discovery Mapper I/O Driver v
oya « >

| Install... | Uninstall | Properties |

## Bagian 3

<!-- 2026-11-24 22:28:46 -->

5. Link-Layer Topology Discovery Responder
   s. Link-Layer Topology Discovery Mapper |/O Driver v
   8 < >
   22 Install... Uninstall Properties
   ere Description
   “re Transmission Control Protocol/Intemet Protocol. The default
   ars wide area network protocol that provides communication
   os across diverse interconnected networks.
   ore OK Cancel
   Highlight Internet Protocol Version 4 (TCP/IPv4) and click Properties to open the Internet Protocol Version 4 (TCP/IPv4) Properties
   window, shown in the figure. Configure the IPv4 address and subnet mask information, and default gateway.
   Note: IPv6 addressing and configuration options are similar to IPv4.
   oa Internet Protocol Version 4 (TCP/IPv4) Properties x
   General
   You can get IP settings assigned automatically if your network supports

## Bagian 4

<!-- 2026-11-24 22:28:50 -->

Highlight Internet Protocol Version 4 (TCP/IPv4) and click Properties to open the Internet Protocol Version 4 (TCP/IPv4) Properties
window, shown in the figure. Configure the IPv4 address and subnet mask information, and default gateway.
Note: IPv6 addressing and configuration options are similar to IPv4.
Internet Protocol Version 4 (TCP/IPv4) Properties x
General
You can get IP settings assigned automatically if your network supports
this capability. Otherwise, you need to ask your network administrator
for the appropriate IP settings.
() Obtain an IP address automatically
@) Use the following IP address:
IP address: 192.168. 1 . 10
Se eee

## Bagian 5

<!-- 2026-11-24 22:28:58 -->

(0 Obtain an IP address automatically
(@) Use the following IP address:
IP address:
Subnet mask:
Default gateway:
Obtain DNS server address automatically
(@ Use the following DNS server addresses:
Preferred DNS server: | & 3 # |
Alternate DNS server: | es |
[_] Validate settings upon exit

## Bagian 6

<!-- 2026-11-24 22:29:01 -->

| | vn | Vaile |
Note: The DNS server addresses are the IPv4 and IPv6 addresses of the Domain Name System (DNS) servers, which are used to
translate IP addresses to domain names, such as www.cisco.com.

- w IS i P - 5: 5 se > .? 7 : = N
  | 4 | 1 3 Rang .. \_ Ly ,
  (“rr = | ~ cm .— © » ° V yy A
  . 1 was NX k ~ - e € ; - :
  | P ; Yg aX A1 " 1 - - , : » P7, / fa
  i “ | 1. 4 | iA
  | Aes ry 2 7) / | Na,
  h (ANT ag . “,
  h | | > Ta bk, a | , 2 5 "
  YA | | 3 wa Tr. » ‘
  14 5 . GS " ta F
  \ 18 - . S1 . v -.
  | | . | 4 “ " 5 4
  ka LI —

## Bagian 7

<!-- 2026-11-24 22:29:06 -->

2.7.2 Automatic IP Address Configuration for End Devices
End devices typically default to using DHCP for automatic IPv4 address configuration. DHCP is a technology that is used in almost every
network. The best way to understand why DHCP is so popular is by considering all the extra work that would have to take place without
it.
In a network, DHCP enables automatic IPv4 address configuration for every end device that is DHCP-enabled. Imagine the amount of
time it would take if every time you connected to the network, you had to manually enter the IPv4 address, the subnet mask, the default
gateway, and the DNS server. Multiply that by every user and every device in an organization and you see the problem. Manual
configuration also increases the chance of misconfiguration by duplicating another device’s IPv4 address.
As shown in the figure, to configure DHCP on a Windows PC, you only need to select Obtain an IP address automatically and Obtain
DNS server address automatically. Your PC will search out a DHCP server and be assigned the address settings necessary to
communicate on the network.
Note: IPv6 uses DHCPv6 and SLAAC (Stateless Address Autoconfiguration) for dynamic address allocation.

Internet Protocol Version 4 (TCP/IPv4) Properties x

General Alternate Configuration
You can get IP settings assigned automatically if your network supports

## Bagian 8

<!-- 2026-11-24 22:29:35 -->

SPA LA Na AI ga Pm mg
You can get IP settings assigned automatically if your network supports
this capability. Otherwise, you need to ask your network administrator

for the appropriate IP settings.

a @ Obtain an IP address automatically
. CO) Use the following IP address:
Ki @ Obtain DNS server address automatically
(©) Use the following DNS server addresses:
Alternate DNS server: [ieee

- Validate settings upon exit
  for || Cancel

## Bagian 9

<!-- 2026-11-24 22:29:44 -->

2.7.3 Syntax Checker - Verify Windows PC IP Configuration
It is possible to display the IP configuration settings on a Windows PC by using the ipconfig command at the command prompt. The
output will show the IPv4 address, subnet mask, and gateway information received from the DHCP server.
Enter the command to display the IP configuration on a Windows PC.
Enter the command to display the IP configuration on a Windows PC.
CN
{f... \ fy
( Showme ) ( Showall )
AN J \ Pi

## Bagian 10

<!-- 2026-11-24 22:29:50 -->

2.7.3 Syntax Checker - Verify Windows PC IP Configuration
It is possible to display the IP configuration settings on a Windows PC by using the ipconfig command at the command prompt. The
output will show the IPv4 address, subnet mask, and gateway information received from the DHCP server.
Enter the command to display the IP configuration on a Windows PC.
C:\> ipconfig
Windows IP Configuration
Ethernet adapter Local Area Connection:
Connection-specific DNS Suffix . : cisco.com
Link-local IPv6 Address . . . . . : fe80::b@ef:ca42:af2c:c6c7%16
IPv4 Address... . ....... . ~~ 1 192.168.1.10
Subnet Mask... . ....... . ~~ 1 255.255.255.0
Default Gateway . . . . . . . . . : 192.168.1.1
You successfully displayed the IP configuration on a Windows PC.
Aaa.
( Reset }
AN Pi

## Bagian 11

<!-- 2026-11-24 22:29:55 -->

2.7.4 Switch Virtual Interface Configuration
To access the switch remotely, an IP address and a subnet mask must be configured on the SVI. To configure an SVI on a switch, use the
interface vian 1 global configuration command. Vian 1 is not an actual physical interface but a virtual one. Next assign an IPv4 address
using the ip address /p-address subnet-mask interface configuration command. Finally, enable the virtual interface using the no
shutdown interface configuration command.
After these commands are configured, the switch has all the IPv4 elements ready for communication over the network.
Note: Similar to a Windows hosts, switches configured with an IPv4 address will typically also need to have a default gateway assigned.
This can be done using the ip default-gateway jp-address global configuration command. The ip-address parameter would be the IPv4
address of the local router on the network, as shown in the example. However, in this module you will only be configuring a network with
switches and hosts. Routers will be introduced later.

Sw-Floor-1# configure terminal

Sw-Floor-1(config)# interface vlan 1

Sw-Floor-1(config-if)# ip address 192.168.1.20 255.255.255.0

Sw-Floor-1(config-if)# no shutdown

Sw-Floor-1(config-if)# exit

Sw-Floor-1(config)# ip default-gateway 192.168.1.1

## Bagian 12

<!-- 2026-11-24 22:32:50 -->

2.7.5 Syntax Checker - Configure a Switch Virtual Interface
Enter interface configuration mode for VLAN 1
Switch(config)#
{f.. Mo,
{ Showme ) ( Showall )
NX P4 NX P4

## Bagian 13

<!-- 2026-11-24 22:32:54 -->

2.7.5 Syntax Checker - Configure a Switch Virtual Interface
Enter interface configuration mode for VLAN 1.
Switch(config)# interface vlan 1
Configure the IPv4 address as 192.168.1.20 and the subnet mask as 255.255.255.0.
Switch(config-if)# ip address 192.168.1.20 255.255.255.0
Enable the interface.
Switch(config-if)# no shutdown
(TN
( Reset )
NX P4
: > Ta
| = & 5
“ ag

## Bagian 14

<!-- 2026-11-24 22:32:58 -->

2.7.5 Syntax Checker - Configure a Switch Virtual Interface
Switch(config)# interface vlan 1
Configure the IPv4 address as 192.168.1.20 and the subnet mask as 255.255.255.0.
Switch(config-if)# ip address 192.168.1.20 255.255.255.0
Enable the interface.
Switch(config-if)# no shutdown
%LINK-5-CHANGED: Interface Vlani, changed state to up
You have successfully configured the switch virtual interface for VLAN 1.
(TN
( Reset )
NX P4
: > Ta
|| = AN al .
“ ag

## Bagian 15

<!-- 2026-11-24 22:33:01 -->

| | it | } 1... rs " " / ~
1 ‘ e. . w'r
| 3! | Pr | ‘ H . £ +
41 ~ 4 'g Ha Ia .
2.7.6 Packet Tracer - Implement Basic Connectivity
In this activity, you will first perform basic switch configurations. Then you will implement basic connectivity by configuring IP addressing
on switches and PCs. When the IP addressing configuration is complete, you will use various show commands to verify configurations
and use the ping command to verify basic connectivity between devices.
B Implement Basic Connectivity & Implement Basic Connectivity

## Bagian 16

<!-- 2026-11-24 22:33:14 -->

2.8.1 Video Activity - Test the Interface Assignment
In the previous topic, you implemented basic connectivity by configuring IP addressing on switches and PCs. Then you verified your
configurations and connectivity, because, what is the point of configuring a device if you do not verify that the configuration is working?
You will continue this process in this topic. Using the CLI, you will verify the interfaces and the addresses of the switches and routers in
your network.
In the same way that you use commands and utilities like ipconfig to verify the network configuration of a PC host, you also use
commands to verify the interfaces and address settings of intermediary devices like switches and routers.
Click Play in the figure to view a video demonstration of the show ip interface brief command. This command is useful for verifying the
condition of the switch interfaces.
Follow Along in Packet Tracer
Download the same PKT file that is used in the video. Practice using the ipconfig and show ip interface brief commands, as shown in
the video.

Video — Test the Interface Assignment

This video will cover the following:

## Bagian 17

<!-- 2026-11-24 22:37:48 -->

2.8.2 Video Activity - Test End-to-End Connectivity

The ping command can be used to test connectivity to another device on the network or a website on the internet.

Click Play in the figure to view a video demonstration using the ping command to test connectivity to a switch and to another PC.

Follow Along in Packet Tracer

Download the same PKT file that is used in the video. Practice using the ping command, as shown in the video.

Video — Test End-to-End Connectivity

This video will cover the use of the ping command to test connectivity on
both switches and both PCs.

## Bagian 18

<!-- 2026-11-24 22:40:08 -->

LL cc.
S &@ 2401240 1256 G) 03
Transcript

Follow along using the transcript.

## Bagian 19

<!-- 2026-11-24 22:40:10 -->

dd dd dd d “--“e
S W 2:40/2:40 1250 Gy £:
Transcript
Follow along using the transcript.

Show Transcript
% Test End-to-End Connectivity

## Bagian 20

<!-- 2026-11-24 22:40:31 -->

2.9.1 Packet Tracer - Basic Switch and End Device
Configuration
As a recently hired LAN technician, you have been asked by your network manager to demonstrate your ability to configure a small LAN.
Your tasks include configuring initial settings on two switches by using the Cisco IOS and configuring IP address parameters on host
devices to provide end-to-end connectivity. You are to use two switches and two hosts on a cabled and powered network.
B Basic Switch and End Device Configuration S Basic Switch and End Device Configuration
vA | De an +: =
J 7 t Lb - ta a = ~~” — « = r .
1 ‘ ~ - & ~ a > Neer >a! ‘e N
4 } 3 - “ as Tg (> i - \* r 4 |
3 ~ . LI ~ SS NA

> “ oe ia 1
> (re ' ‘ ’ © be ag, “3 "4 .
> ~ ; 2"

## Bagian 21

<!-- 2026-11-24 22:40:50 -->

2.9.2 Lab - Basic Switch and End Device Configuration
Skills Practice Opportunity
You have the opportunity to practice the following skills:

- Part 1: Set Up the Network Topology

* Part 2: Configure PC Hosts

- Part 3: Configure and Verify Basic Switch Settings
  You can practice these skills using the Packet Tracer or lab equipment, if available.
  Packet Tracer - Physical Mode (PTPM)
  Basic Switch and End Device Configuration - Physical Basic Switch and End Device Configuration - Physical
  iz] +
  Mode Mode
  Lab Equipment

## Bagian 22

<!-- 2026-11-24 22:41:09 -->

2.9.3 What did I learn in this module?

All end devices and network devices reguire an operating system (OS). The user can interact with the shell using a command-line
interface (CLI) to use a keyboard to run CLI-based network programs, use a keyboard to enter text and text-based commands, and view
output on a monitor.

As a security feature, the Cisco IOS software separates management access into the following two command modes: User EXEC Mode
and Privileged EXEC Mode.

Global configuration mode is accessed before other specific configuration modes. From global config mode, the user can enter different
subconfiguration modes. Each of these modes allows the configuration of a particular part or function of the IOS device. Two common
subconfiguration modes include: Line Configuration Mode and Interface Configuration Mode. To move in and out of global configuration
mode, use the configure terminal privileged EXEC mode command. To return to the privileged EXEC mode, enter the exit global config
mode command.

Each IOS command has a specific format or syntax and can only be executed in the appropriate mode. The general syntax for a
command is the command followed by any appropriate keywords and arguments. The IOS has two forms of help available: context-
sensitive help and command syntax check.

The first configuration command on any device should be to give it a unigue device name or hostname. Network devices should always
have passwords configured to limit administrative access. Cisco IOS can be configured to use hierarchical mode passwords to allow
different access privileges to a network device. Configure and encrypt all passwords. Provide a method for declaring that only authorized
personnel should attempt to access the device by adding a banner to the device output.

There are two system files that store the device configuration: startup-config and running-config. Running configuration files can be
altered if they have not been saved. Configuration files can also be saved and archived to a text document.

IP addresses enable devices to locate one another and establish end-to-end communication on the internet. Each end device on a

## Bagian 23

<!-- 2026-11-24 22:41:52 -->

2.9.3 What did I learn in this module?
All end devices and network devices reguire an operating system (OS). The user can interact with the shell using a command-line
interface (CLI) to use a keyboard to run CLI-based network programs, use a keyboard to enter text and text-based commands, and view
output on a monitor.
As a security feature, the Cisco IOS software separates management access into the following two command modes: User EXEC Mode
and Privileged EXEC Mode.
Global configuration mode is accessed before other specific configuration modes. From global config mode, the user can enter different
subconfiguration modes. Each of these modes allows the configuration of a particular part or function of the IOS device. Two common
subconfiguration modes include: Line Configuration Mode and Interface Configuration Mode. To move in and out of global configuration
mode, use the configure terminal privileged EXEC mode command. To return to the privileged EXEC mode, enter the exit global config
mode command.
Each IOS command has a specific format or syntax and can only be executed in the appropriate mode. The general syntax for a
command is the command followed by any appropriate keywords and arguments. The IOS has two forms of help available: context-
sensitive help and command syntax check.
The first configuration command on any device should be to give it a unique device name or hostname. Netwr es
have passwords configured to limit administrative access. Cisco IOS can be configured to use hierarchical mc © Discord Sa x
different access privileges to a network device. Configure and encrypt all passwords. Provide a method for dé

ersonnel should attempt to access the device by adding a banner to the device output poze asa
p p y 9 put: . INFORMATION)
There are two system files that store the device configuration: startup-config and running-config. Running co = amen ev-testing is now

5 = = automated:
altered if they have not been saved. Configuration files can also be saved and archived to a text document.
2 5 angs - We are integrating AutoCraft, our

IP addresses enable devices to locate one another and establish end-to-end communication on the internet. 5 ta deni oa

## Bagian 24

<!-- 2026-11-24 22:42:16 -->

Each IOS command has a specific format or syntax and can only be executed in the appropriate mode. The general syntax for a
command is the command followed by any appropriate keywords and arguments. The IOS has two forms of help available: context-
sensitive help and command syntax check.

The first configuration command on any device should be to give it a unigue device name or hostname. Network devices should always
have passwords configured to limit administrative access. Cisco IOS can be configured to use hierarchical mode passwords to allow
different access privileges to a network device. Configure and encrypt all passwords. Provide a method for declaring that only authorized
personnel should attempt to access the device by adding a banner to the device output.

There are two system files that store the device configuration: startup-config and running-config. Running configuration files can be
altered if they have not been saved. Configuration files can also be saved and archived to a text document.

IP addresses enable devices to locate one another and establish end-to-end communication on the internet. Each end device on a
network must be configured with an IP address. The structure of an IPv4 address is called dotted decimal notation and is represented by
four decimal numbers between 0 and 255.

IPV4 address information can be entered into end devices manually, or automatically using Dynamic Host Configuration Protocol (DHCP).
In a network, DHCP enables automatic IPv4 address configuration for every end device that is DHCP-enabled. To access the switch
remotely, an IP address and a subnet mask must be configured on the SVI. To configure an SVI on a switch, use the interface vlan 1
command in global configuration mode.

In the same way that you use commands and utilities to verify a PC host's network configuration, you also use commands to verify the
interfaces and address settings of intermediary devices like switches and routers. The show ip interface brief command verifies the
condition of the switch interfaces. The ping command can be used to test connectivity to another device on the network or a website on
the internet.

## Bagian 25

<!-- 2026-11-24 22:42:23 -->

Ouestion 1
Which statement is true about the running configuration file in a Cisco IOS device?

O tis stored in NVRAM.

O It affects the operation of the device immediately when modified.

O It should be deleted using the erase running-config command.

O It is automatically saved when the router reboots.

1 of 14 Questions
Skip All Skip Question Submit

## Bagian 26

<!-- 2026-11-24 22:42:46 -->

< (| B >

Question 2
Which two statements are true regarding the user EXEC mode? (Choose two.)

oO All router commands are available.

oO Interfaces and routing protocols can be configured.

oO The device prompt for this mode ends with the '>" symbol.

oO Global configuration mode can be accessed by entering the enable command.

oO Only some aspects of the router configuration can be viewed.

2 of 14 Questions
Skip All Skip Question Submit

## Bagian 27

<!-- 2026-11-24 22:43:04 -->

< {ar} (ol) B >

Question 3
Which type of access is secured on a Cisco router or switch with the enable secret command?

© Virtual terminal

DOD AvUXport

O Console line

O \_ Privileged EXEC

3 of 14 Questions
Skip All Skip Question Submit

## Bagian 28

<!-- 2026-11-24 22:43:21 -->

« [a1] (ae) {os} >

Question 4
What is the default SVI on a Cisco switch?

O \_ VLANg999

O \_ VLAN100

O \_ VLAN99

DO VLAN1

4 of 14 Questions
Skip All Skip Question Submit

## Bagian 29

<!-- 2026-11-24 22:43:26 -->

« Jar) (oz) (as) (oa) KI >

Question 5
When a hostname is configured through the Cisco CLI, which three naming conventions are part of the guidelines? (Choose three.)

oO The hostname should be written in all lower case characters

oO The hostname should begin with a letter

CL) The hostname should end with a special character

CU) The hostname should contain no spaces

oO The hostname should be fewer than 64 characters in length

5 of 14 Questions
Skip All Skip Question Submit

## Bagian 30

<!-- 2026-11-24 22:43:54 -->

€ an) [22] (as) (as) (os) (Be >

Question 6
What is the function of the shell in an OS?

© \_\_Itprovides dedicated firewall services.

O \_\_Itinteracts with the device hardware.

O It provides the intrusion protection services for the device.

O It interfaces between the users and the kernel.

6 of 14 Questions
Skip All Skip Question Submit

## Bagian 31

<!-- 2026-11-24 22:44:15 -->

€ Jar) (az) (as) (aa) (as) {os} >

Question 7
A router with a valid operating system contains a configuration file stored in NVRAM. The configuration file has an enable secret
password but no console password. When the router boots up, which mode will display?

© | User EXEC mode

©O \_ Global configuration mode

O Privileged EXEC mode

O \_ Setup mode

7 of 14 Questions
Skip All Skip Question Submit

## Bagian 32

<!-- 2026-11-24 22:44:53 -->

€ [a1] (oz) [a3] (aa) (as) (ae) (or) >

Question 8
An administrator has just changed the IP address of an interface on an IOS device. What else must be done in order to apply those
changes to the device?

Oo Nothing must be done. Changes to the configuration on an IOS device take effect as soon as the command is typed

correctly and the Enter key has been pressed.

O Reload the device and type yes when prompted to save the configuration.

O Copy the running configuration to the startup configuration file.

O Copy the information in the startup configuration file to the running configuration.

8 of 14 Questions
Skip All Skip Question Submit

## Bagian 33

<!-- 2026-11-24 22:45:36 -->

€ [a1] {a2} (as (as) [as] (ae) (ar) (os) KI >

Question 9
Which memory location on a Cisco router or switch will lose all content when the device is restarted?

0D RAM

DO ROM

© Flash

OO NVRAM

9 of 14 Questions
Skip All Skip Question Submit

## Bagian 34

<!-- 2026-11-24 22:45:51 -->

€ {a1} (az) (as) (aa) (as) (as) (az) (as) (as) Bi >

Question 10
Why would a technician enter the command copy startup-config running-config?

O | To save an active configuration to NVRAM

O To copy an existing configuration into RAM

O To remove all configurations from the switch

O To make a changed configuration the new startup configuration

10 of 14 Questions
Skip All Skip Question Submit

## Bagian 35

<!-- 2026-11-24 22:46:00 -->

« (ar) faz| (as) (aa) [as] {os} [a7] (as) (as) (aro BM >

Question 11
Which functionality is provided by DHCP?

O \_ Remote switch management

© \_\_ Translation of IP addresses to domain names

O Automatic assignment of an IP address to each host

O End-to-end connectivity test

11 of 14 Questions
Skip All Skip Question Submit

## Bagian 36

<!-- 2026-11-24 22:47:37 -->

€ {ar} {a2} fas| (aa) [a5] (ae) [a7] [os] (as) (aro fan) Ba >

Question 12
Which two functions are provided to users by the context-sensitive help feature of the Cisco IOS CLI? (Choose two.)

oO Determining which option, keyword, or argument is available for the entered command

oO Providing an error message when a wrong command is submitted

oO Selecting the best command to accomplish a task

oO Allowing the user to complete the remainder of an abbreviated command with the TAB key

oO Displaying a list of all available commands within the current mode

12 of 14 Questions
Skip All Skip Question Submit

## Bagian 37

<!-- 2026-11-24 22:48:05 -->

€ fa) {a2} (as) (as) (as) (ae) (an) (as) (as) (ono (ani) fonz| i ?

Ouestion 13
Which memory location on a Cisco router or switch stores the startup configuration file?

DO ROM

0D RAM

© Flash

OO NVRAM

13 of 14 Questions
Skip All Skip Question Submit

## Bagian 38

<!-- 2026-11-24 22:48:15 -->

« (an) (ae) fa) (aa) (ae) (ae) (ar) (ae) (as) ford (am) fara) fa) | >

Question 14
To what subnet does the IP address 10.1.100.50 belong if a subnet mask of 255.255.0.0 is used?

O 101.100.32

O 101.1000

O 10.1.0.0

O 10.0.0.0

14 of 14 Questions
Skip All Skip Question Submit

## Bagian 39

<!-- 2026-11-24 22:49:05 -->

€ Jar (az) (as (au) [os] (as) fan) as (aa) (aro) (ani) (ana) fana) lara) KEKE ?
(>
You have scored 79%.
Congratulations, you have passed the exam.
Review Assessment

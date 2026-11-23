
## Bagian 1
<!-- 2026-11-23 15:28:35 -->

1.6.1 Network Architecture
Have you ever been busy working online, only to have “the internet go down”? As you know by now, the internet did not go down, you
just lost your connection to it. It is very frustrating. With so many people in the world relying on network access to work and learn, it is
imperative that networks are reliable. In this context, reliability means more than your connection to the internet. This topic focuses on the
four aspects of network reliability.
The role of the network has changed from a data-only network to a system that enables the connections of people, devices, and
information in a media-rich, converged network environment. For networks to function efficiently and grow in this type of environment,
the network must be built upon a standard network architecture.
Networks also support a wide range of applications and services. They must operate over many different types of cables and devices,
which make up the physical infrastructure. The term network architecture, in this context, refers to the technologies that support the
infrastructure and the programmed services and rules, or protocols, that move data across the network.
As networks evolve, we have learned that there are four basic characteristics that network architects must address to meet user
expectations:

« Fault Tolerance

¢ Scalability

+ Quality of Service (QoS)

« Security


## Bagian 2
<!-- 2026-11-23 15:29:24 -->

1.6.2 Fault Tolerance
A fault tolerant network is one that limits the number of affected devices during a failure. It is built to allow quick recovery when such a
failure occurs. These networks depend on multiple paths between the source and destination of a message. If one path fails, the
messages are instantly sent over a different link. Having multiple paths to a destination is known as redundancy.
Implementing a packet-switched network is one way that reliable networks provide redundancy. Packet switching splits traffic into
packets that are routed over a shared network. A single message, such as an email or a video stream, is broken into multiple message
blocks, called packets. Each packet has the necessary addressing information of the source and destination of the message. The routers
within the network switch the packets based on the condition of the network at that moment. This means that all the packets in a single
message could take very different paths to the same destination. In the figure, the user is unaware and unaffected by the router that is
dynamically changing the route when a link fails.
Internet
— | | — MI padiundant-annestanesilau


## Bagian 3
<!-- 2026-11-23 15:29:38 -->

Internet
aa Pata"
ML 1|T——
MO em, =o,
— Redundant connections allow
— =—= ——_ for alternative paths if a
ry va » device or a link fails. The user
Are experience is unaffected.
2 Le
r) Fr -
Ls
- PP |
° 3


## Bagian 4
<!-- 2026-11-23 15:30:38 -->

Internet
/ an, NN
~~ aaa
,
™~ 7 ~~ a
a =
Ba Redundant connections allow
. —— ——_ for alternative paths if a
F — Lat » device or a link fails. The user
Are experience is unaffected.
2 Le
o fF 6
Ls
- PA |
° 3
© Discord ea x
| : . Vivi Hoshiko (g&4 Gaming room » 1, » Voice
| 2 Call »)
|. Mas?  @Sissyan-puppy Betha Wolf auto drama
|


## Bagian 5
<!-- 2026-11-23 15:30:49 -->

1.6.3 Scalability
A scalable network expands guickly to support new users and applications. It does this without degrading the performance of services
that are being accessed by existing users. The figure shows how a new network is easily added to an existing network. These networks
are scalable because the designers follow accepted standards and protocols. This lets software and hardware vendors focus on
improving products and services without having to design a new set of rules for operating within the network.
Internet
TAP gr
Patas a
Peka Pan
a Le a a
Ar
Ls , :


## Bagian 6
<!-- 2026-11-23 15:30:56 -->

dynamically changing the route when a link fails.
Internet
/ an, WN
~~ aaa
,
5 — Ya
MO em, =o,
Il Redundant connections allow
— —— ——_ for alternative paths if a
F 1. a device or a link fails. The user
Are experience is unaffected.
2 Le
o fF 6
Ls
- PA |
° 3


## Bagian 7
<!-- 2026-11-23 15:31:36 -->

Internet
Pa" ——
L — MN —-
—— Pa
PP
r er 5. PJ
Ls
tJ fd fd

Additional users and whole networks can be connected to the internet without degrading performance for
existing users.


## Bagian 8
<!-- 2026-11-23 15:31:50 -->

| , 1 | 85 = - Po " "

ON DEINE i ea “NN
1.6.4 Ouality of Service
Quality of Service (QoS) is an increasing requirement of networks today. New applications available to users over networks, such as voice
and live video transmissions, create higher expectations for the quality of the delivered services. Have you ever tried to watch a video
with constant breaks and pauses? As data, voice, and video content continue to converge onto the same network, QoS becomes a
primary mechanism for managing congestion and ensuring reliable delivery of content to all users.
Congestion occurs when the demand for bandwidth exceeds the amount available. Network bandwidth is measured in the number of bits
that can be transmitted in a single second, or bits per second (bps). When simultaneous communications are attempted across the
network, the demand for network bandwidth can exceed its availability, creating network congestion.
When the volume of traffic is greater than what can be transported across the network, devices will hold the packets in memory until
resources become available to transmit them. In the figure, one user is requesting a web page, and another is on a phone call. With a
QoS policy in place, the router can manage the flow of data and voice traffic, giving priority to voice communications if the network
experiences congestion.The focus of QoS is to prioritize time-sensitive traffic. The type of traffic, not the content of the traffic, is what is
important.


## Bagian 9
<!-- 2026-11-23 15:32:06 -->

Quality of Service, managed by the Internet

router, ensures that priorities are . .

matched with the type of = =

communication and its importance wie wie

Oo the organization. ey ey

ia a
_ ae = 2 A
IP
7) fe 2 8
Le
1) 1) Yd
eb pages can usually receive a lower priority. A Voice over IP (VoIP) Call will need priority to maintain a
mooth, uninterrupted user experience.


## Bagian 10
<!-- 2026-11-23 15:32:30 -->

1.6.5 Network Security
The network infrastructure, services, and the data contained on network-attached devices are crucial personal and business assets.
Network administrators must address two types of network security concerns: network infrastructure security and information security.
Securing the network infrastructure includes physically securing devices that provide network connectivity and preventing unauthorized
access to the management software that resides on them, as shown in the figure.
Administrators can protect the 3
network with software and
hardware security and by Internet
preventing physical access to = =
network devices. - | 7 Login: ?
LK wes Password: ?
# rn x a + x
[ — au,
a
>< Ng
RN
a fd »
LM
EP


## Bagian 11
<!-- 2026-11-23 15:32:37 -->

Administrators can protect the . .
network with software and
hardware security and by Internet
preventing physical access to = =
network devices. 7 ; Login: ?
Deo Dee Password: ?
La Paya
a
>< Ng
~~
- — a -.
LM
PA
(/
» Las 7
PA
Ls :
PA » r
ff
Security measures protect the network from unauthorized access.
Network administrators must also protect the information contained within the packets being transmitted over the network, and the
information stored on network attached devices. In order to achieve the goals of network security, there are three primary requirements.


## Bagian 12
<!-- 2026-11-23 15:32:41 -->

am, -_ =.
F
a 2.
ff
Security measures protect the network from unauthorized access.
Network administrators must also protect the information contained within the packets being transmitted over the network, and the
information stored on network attached devices. In order to achieve the goals of network security, there are three primary requirements.
« Confidentiality - Data confidentiality means that only the intended and authorized recipients can access and read data.
« Integrity - Data integrity assures users that the information has not been altered in transmission, from origin to destination.
« Availability - Data availability assures users of timely and reliable access to data services for authorized users.
| $ , > ry 4 “ 1 i f ul ia # Rn ,
: » $ LI 0. a! ier
7” * . “ - +7 4
(“HT } A " © 2 Un, — ( PM
tek LM |


## Bagian 13
<!-- 2026-11-23 15:32:46 -->

< @ >

Question 1
When designers follow accepted standards and protocols, which of the four basic characteristics of network architecture is achieved?

O _ Security

© Fault tolerance

O _ Scalability

DO Qos

1 of 4 Questions
Skip All Skip Question Submit


## Bagian 14
<!-- 2026-11-23 15:32:59 -->

< @ >

Question 1
When designers follow accepted standards and protocols, which of the four basic characteristics of network architecture is achieved?

O _ Security

© Fault tolerance

O _ Scalability

1 of 4 Questions
SkipAll Skip Question fl Submit|)


## Bagian 15
<!-- 2026-11-23 15:33:03 -->

Ka 2 >

Question 2
Confidentiality, integrity, and availability are requirements of which of the four basic characteristics of network architecture?

O _ Security

© _ Fault tolerance

DO Qos

O _ Scalability

2 of 4 Questions
Skip All Skip Question Submit


## Bagian 16
<!-- 2026-11-23 15:33:29 -->

«aj B >
Question 1
When designers follow accepted standards and protocols, which of the four basic characteristics of network architecture is achieved?
© _ Fault tolerance
O _ Scalability
1 of 4 Questions
SkipAll Skip Question fl Submit|)


## Bagian 17
<!-- 2026-11-23 15:33:35 -->

X jail jaz KS >

Question 3
With which type of policy, a router can manage the flow of data and voice traffic, giving priority to voice communications if the network
experiences congestion?

O _ Scalability

DO Qos

© Fault tolerance

O _ Security

3 of 4 Questions
Skip All Skip Question Submit


## Bagian 18
<!-- 2026-11-23 15:33:48 -->

Kla jaz} |as ry >

Question 4
Having multiple paths to a destination is known as redundancy. This is an example of which characteristic of network architecture?

O _ Scalability

O _ Security

© Fault tolerance

DO Qos

4 of 4 Questions
Skip All Skip Question Submit


## Bagian 19
<!-- 2026-11-23 15:34:00 -->

< Jar) (az) (as) @ >
Question 3
With which type of policy, a router can manage the flow of data and voice traffic, giving priority to voice communications if the network
experiences congestion?
© _ Scalability
O- Qos
© Fault tolerance
O _ Security
3 of 4 Questions


## Bagian 20
<!-- 2026-11-23 15:34:05 -->

< Jar) (az) (as) @ >

Question 3
With which type of policy, a router can manage the flow of data and voice traffic, giving priority to voice communications if the network
experiences congestion?

O _ Scalability

© Fault tolerance

O _ Security

3 of 4 Questions


## Bagian 21
<!-- 2026-11-23 15:34:15 -->

< lan) (oe) (oo) B >

Question 2
Confidentiality, integrity, and availability are requirements of which of the four basic characteristics of network architecture?

O _ Security

© Fault tolerance

O _ Scalability

2 of 4 Questions
SkipAll Skip Question fl Submit|)


## Bagian 22
<!-- 2026-11-23 15:34:26 -->

< @ >

Question 1
When designers follow accepted standards and protocols, which of the four basic characteristics of network architecture is achieved?

O _ Scalability

DO Qos

O _ Security

1 of 4 Questions
Skip All Skip Question Submit


## Bagian 23
<!-- 2026-11-23 15:34:39 -->

Ka 2 >

Question 2
Confidentiality, integrity, and availability are requirements of which of the four basic characteristics of network architecture?

© _ Fault tolerance

O _ Scalability

O _ Security

DO Qos

2 of 4 Questions
Skip All Skip Question Submit


## Bagian 24
<!-- 2026-11-23 15:34:41 -->

‘oj @ >

Question 2
Confidentiality, integrity, and availability are requirements of which of the four basic characteristics of network architecture?

© _ Fault tolerance

O _ Security

DO Qos

2 of 4 Questions
Skip All Skip Question Submit


## Bagian 25
<!-- 2026-11-23 15:34:49 -->

K lal |a2 KS >

Question 3
With which type of policy, a router can manage the flow of data and voice traffic, giving priority to voice communications if the network
experiences congestion?

© Fault tolerance

O _ Scalability

O _ Security

DO Qos

3 of 4 Questions
Skip All Skip Question Submit


## Bagian 26
<!-- 2026-11-23 15:35:09 -->

< {a1} az) fas| (aa MRRRAG >

Question 3

With which type of policy, a router can manage the flow of data and voice traffic, giving priority to voice communications if the network

experiences congestion?
Fault tolerance

x Scalability

Security
QoS


## Bagian 27
<!-- 2026-11-23 15:35:17 -->

K [a1] [a2] (aa) (as) (kesinpsnd >
Question 2
Confidentiality, integrity, and availability are requirements of which of the four basic characteristics of network architecture?
Fault tolerance
Scalability
QoS


## Bagian 28
<!-- 2026-11-23 15:35:20 -->

K [a1] [a2] an) (as) (estes) >
Question 1
When designers follow accepted standards and protocols, which of the four basic characteristics of network architecture is achieved?
Scalability
Fault tolerance
Security


## Bagian 29
<!-- 2026-11-23 15:35:53 -->

< | ResutPage »
100%
You have scored 100%.
Congratulations, you have passed the exam.


---
title: The Chase
author: Adam J Campbell
date: '2021-07-03'
slug: the-chase-1
categories: []
tags: [The Chase, statistics, analysis] 
subtitle: ''
summary: "A deep dive into trends and analysis of the TV's The Chase"
authors: []
#lastmod: '2021-08-07T12:45:19+12:00'
featured: no
aliases:
   - /post/the_chase_1/
image:
  caption: "How often players win the Head-to-Head based on Cash Builder performance"
  focal_point: 'Center'
  preview_only: true
  alt_text: 'Chances of Players success in Head-to-Head round based on choice of lower, middle, or higher offer and number of correct answers in the Cash Builder round.'
projects: []


links:
 - name: "code"
   url: https://github.com/campbead/thechase
   icon_pack: fab
   icon: github

---

## The project
[The Chase](https://en.wikipedia.org/wiki/The_Chase_(British_game_show)) is a British quiz show running since 2009.  Players answer quiz questions to compete as a team against a quiz master, called the Chaser.  The game consists of three main sections: the Cash Builder, the Head-to-Head and the Final Chase.  This post is the first in a series of exploring statistics of the Chase.  In this post, I'll be exploring the Cash Builder scores and how those scores influence performance during the Head-to-Head round.  If you aren't familiar with the Chase, the [Gameplay](https://en.wikipedia.org/wiki/The_Chase_(British_game_show)#Gameplay) section of the Wikipedia page has a good overview.

## Data
Data for The Chase has been meticulously compiled on [One Question Shootout!](http://onequestionshootout.xyz/), ([{{< icon name="twitter" pack="fab" >}}](https://twitter.com/OneQnShootout)).  This website has catalogued a massive amount of data for The Chase's 14 (current) seasons.  There is data on each game: if the player or the chaser won, who the chaser was, total prize fund and much more.  For each player, there is data on their performance in the Cash Builder, the Head-to-Head, the Final Chase. 

The data has been scraped and processed using a script available my [GitHub](https://github.com/campbead) [The Chase repo](https://github.com/campbead/thechase/blob/master/ETL.R).

### The data we don't have
Unfortunately, there isn't data on individual data on individual questions.  We don't know what questions were asked, or even how many questions are asked during Cash Builder, Head to Head, and the Final Chase.

## Cash Builder
Each player in the show competes in the Cash Builder to increase the overall pot size for the Final Chase, with the correct answer in this phase being worth £1,000.  At present this analysis has 6840 data points for Cash Builder performance.

The figure below shows a median score for the Cash Builder to be 5. The distribution of correct answers is more-or-less bell-shaped, with over half of all players scoring between 4-6. The highest score ever is 14, and 0.6% have scored 0.

![Histrogram distrobution of correct answers during Cash Builder round.](correct_answer_distribution.png)
And an alternative way to look at this data is as a cumulative probability graph seen below.  What this figure shows is that just under 80% of players scoring 6 or less during this phase, and therefore any player 7 or greater is in the top ~20% of all players.  I will go on to show how correct answers in the cash builder can predict performance in other parts of the game.

![Cummulative distrobution of correct answers during the Cash Builder round.](correct_answer_distribution_cummulative.png)

## Low, Medium, High
After the Cash Builder players are given the choice of a Higher, Lower, or Middle offer.  The middle offer is always £1,000 for each correct answer in the Cash Builder.   The Lower and Higher offers are always in fact, lower or higher than the middle offer.  The exact amount of the higher and lower offers isn't prescribed (but perhaps we can analyze what factors influence those in a future post).

Nearly 80 percent of players opt to take the middle offer. 

![Bar chart of how often the Lower, Middle and Higher offers are choosen during the Head-to-Head round.](Offer_choice_frequency.png)
The number of correct answers doesn't appear to strongly influence the choice of offer with the distribution of offers not changing much based on the number of correct answers in the Cash Builder.  The exceptions to this are at the extreme lower end, where Higher and Lower offers become increasingly more common, and at the extreme higher end, where middle offers are more likely.

![Stacked bar chart of frequency of offer taken, based on number of correct answers during the Cash Builder.](Offer_choice_frequency_by_correct_answer.png)
The value of the higher offer does bear some influence over the choice of the offer, with higher offers above £70,000 becoming increasing more likely to be chosen.

![Stacked bar chart of frequency of offer taken, based the value of the higher offer.](How_enticing_is_the_higher_offer.png)

## Doing better in the Cash Builder means you'll do better in the Head-to-Head
We can look at how likely players are to win their Head-to-Head based on the number of correct answers in the Cash Builder and the offer taken.
Players are offered a higher offer and lower offer, in addition to the middle offer based on the correct answers during the Cash Builder.
![Chances of Player's success in Head-to-Head round based on choice of lower, middle, or higher offer and number of correct answers in the Cash Builder round.](WinningPCT_by_correct_and_offer.png)
What is very clear here is the better a player does during the Cash Builder round, the better their chances of winning the Head-to-Head and that is true for a player taking any of the offers.  A player taking a middle offer after answering 7 correct answers in the Cash Builder will have about a 70% chance of advancing into the Final Chase, whereas a player answering only 2 correct answers will only have about a 50% chance of advancing after taking a middle offer. It is also true picking the lower offer improves the player's chances of winning the Head-to-Head by about 9% while picking the higher offer decreases the player's chances of winning the Head-to-Head by about 20%.

- Value of Low and High doesn't affect win %
We can also look at how the chance of winning the Head-to-Head is affected by the amount of the chosen offer

![Chances of Player's success in Head-to-Head picking a lower offer based on value of the offer picked.](WinningPCT_Lower.png)
![Chances of Player's success in Head-to-Head picking a middle offer based on value of the offer picked.](WinningPCT_Middle.png)
![Chances of Player's success in Head-to-Head picking a higher offer based on value of the offer picked.](WinningPCT_Higher.png)

What is clear in the above figures is the chance to win isn't well correlated to the amount of the chosen offer, except for middle offer which is because is middle offer amount is directly proportional to the number of correct answers during Cash Builder round.

## Future topics
This is an ongoing series, in future posts I'll cover:

- factors influencing the choice of the higher, middle, and lower offers,
- factors influencing the score in the Head-to-Head,
- statistics of the Final Chase.


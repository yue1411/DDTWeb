---
title: Amine Inversion
author: Misa
description: Movie of Amine inversion.
category: Sample
image: amine-chemdraw.jpeg
---


<section id="about" class="text-left py-3">
  <div class="row">
    <div class="container">
        <div class="col-sm">
            <div class="card">
              <div class="card-body">
                <h3 class="text-center">Reaction Mechanism</h3>
                <h5 class="text-muted text-center">Amine Inversion</h5>
                <!-- <p class="text-left">&nbsp;&nbsp;&nbsp;&nbsp; E2 elimination.</p>  -->
                <p style="text-align:center;">
                <img src="{{site.baseurl}}/assets/images/normal/amine-mechanism.jpg" alt="centered image" style="width:600px;height:126px;">
                </p>
              </div>
            </div>
        </div> 
    </div>
  </div>
<br>
<br>
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="card">
          <div class="card-body">
            <h3 class="text-center">Movie of dynamics trajectory</h3>
            <h5 class="text-muted text-center">Major trajectory</h5>
                <p style="text-align:center;">
                <img src="{{site.baseurl}}/assets/images/normal/amine_traj1-13.gif" alt="centered image" style="width:600px;height:480px;">
                </p>
          </div>
        </div>
      </div>
    </div>
  </div>
<br>
<br>
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="card">
          <div class="card-body">
            <h3 class="text-center">Movie of IRC</h3>
            <h5 class="text-muted text-center">IRC of the reaction</h5>
                <p style="text-align:center;">
                <img src="{{site.baseurl}}/assets/images/normal/amine_IRC_loop.gif" alt="centered image" style="width:600px;height:336px;">
                </p>
          </div>
        </div>
      </div> 
    </div>
  </div>
</section>

<br>
<br>

> ##### Keywords and level of theory for the calculation:<br>
###### TS optimization:
<samp>opt=(calcfc,ts,noeigen) freq b3lyp/6-31g(d) scf=xqc</samp> <br>
###### HP freq calculation:
<samp> freq=hpmodes b3lyp/6-31g(d)</samp> <br>
###### IRC calculation (lqa keyword):
<samp>irc=(calcfc,maxpoints=300,lqa) b3lyp/6-31g(d)</samp> <br>
###### Dynamics:
<samp>progdyn.conf: method b3lyp/6-31g(d), classical 0</samp>

<br>

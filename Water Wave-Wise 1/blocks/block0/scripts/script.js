/**
 * (c) Meta Platforms, Inc. and its affiliates. Confidential and proprietary.
 */

//==============================================================================
// Welcome to scripting in Spark AR Studio! Helpful links:
//
// Scripting Basics - https://fb.me/spark-scripting-basics
// Reactive Programming - https://fb.me/spark-reactive-programming
// Scripting Object Reference - https://fb.me/spark-scripting-reference
// Changelogs - https://fb.me/spark-changelog
//
// Spark AR Studio extension for VS Code - https://fb.me/spark-vscode-plugin
//
// For projects created with v87 onwards, JavaScript is always executed in strict mode.
//==============================================================================


const Scene = require('Scene');
const CameraInfo = require('CameraInfo');
const Patches = require('Patches');

export const Diagnostics = require('Diagnostics');



(async function () {  

  Patches.inputs.setPoint2D('RelativeScreenSize', CameraInfo.previewSize.div(CameraInfo.previewScreenScale));


})(); 

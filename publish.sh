#!/usr/bin/env bash

aws s3 cp --recursive  ./ s3://webdev-class.lawrencemcdaniel.com --profile default

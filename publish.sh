#!/usr/bin/env bash

aws s3 sync  ./ s3://webdev-class.lawrencemcdaniel.com --profile default

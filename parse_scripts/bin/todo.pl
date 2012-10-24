#!/usr/bin/perl

use strict;

for(my $i=90;$i>2;$i--)
{
	my $ts = int((time()  - $i*86400)/86400)*86400;
	my $d  = int($ts / 2592000) * 2592000;
	my $p = "/u/logfiles/daily/day/geo/".$d."/".$ts.".txt";

	if (!( -f $p || -f $p.".gz"))
	{
		print $ts."\t".scalar(localtime($ts))."\n";
	}
}

#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Return recent items from a json feed. Recent means "In the last X days."
import os
import doctest
import json
import urllib2
import argparse

class GetJson:
    """ Methods for ingesting JSON feeds.
        >>> rj = GetJson()
        >>> rj.get('')
        True
        """

    def __init__(self, args={}):
        self.args = args

    def get_filename(self, url):
        """ Given a url, such as:
                http://www.nydailynews.com/json/cmlink/eating-b-line-1.3377799
                http://www.nydailynews.com/json/cmlink/eating-b-line/json/
                or
                http://www.nydailynews.com/json/cmlink/eating-b-line-1.3377799.json
            Return a string we can use as a filename.
            >>> rj = GetJson()
            >>> rj.get_filename('http://www.nydailynews.com/json/cmlink/eating-b-line-1.3377799')
            eating-b-line-1.3377799
            >>> rj.get_filename('http://www.nydailynews.com/json/cmlink/eating-b-line/json/')
            json.json
            >>> rj.get_filename('http://www.nydailynews.com/json/cmlink/eating-b-line-1.3377799.json')
            eating-b-line-1.3377799.json
            """
        bits = url.split('/')
        if url[-1] == '/':
            return '%s.json' % bits[-1]
        return bits[-1]

    def get(self, url):
        """ Wrapper for API requests. Take a URL, return a json array.
            >>> url = ''
            >>> parser = build_parser()
            >>> args = parser.parse_args([url])
            >>> rj = GetJson(args)
            >>> rj.get(url)
            True
            """
        fn = self.get_filename(url)
        response = urllib2.urlopen(url)
        if int(response.code) >= 400:
            if 'verbose' in self.args and self.args.verbose:
                print "URL: %s" % url
            raise ValueError("URL %s response: %s" % (url, response['status']))
        self.xml = response.read().replace('\\u2013', '-')
        fh = open(fn, 'wb')
        fh.write(self.xml)
        fh.close()

        return True

def main(args):
    """ For command-line use.
        """
    rj = GetJson(args)
    if args:
        articles = []
        for arg in args.urls[0]:
            if args.verbose:
                print arg
            rj.get(arg)
            try:
                p = rj.parse()
            except:
                continue

def build_parser():
    """ We put the argparse in a method so we can test it
        outside of the command-line.
        """
    parser = argparse.ArgumentParser(usage='$ python getjson.py http://domain.com/json/',
                                     description='''Takes a list of URLs passed as args.
                                                  ''',
                                     epilog='')
    parser.add_argument("-v", "--verbose", dest="verbose", default=False, action="store_true")
    parser.add_argument("urls", action="append", nargs="*")
    return parser

if __name__ == '__main__':
    """ 
        """
    parser = build_parser()
    args = parser.parse_args()

    if args.verbose:
        doctest.testmod(verbose=args.verbose)

    main(args)

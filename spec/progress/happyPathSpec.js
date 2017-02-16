/*
  global describe, beforeEach, afterEach, it, expect
*/
'use strict'

const sinon = require('sinon')

const ajax = require('../../src/js/ajax')
const api = require('../../src/js/api-endpoints')
const browser = require('../../src/js/browser')

const ViewPledges = require('../../src/js/ViewPledges')

describe('View Pledges', () => {
  let sut = null
  let ajaxGetStub = null

  beforeEach(() => {
    sinon.stub(browser, 'loading')
    sinon.stub(browser, 'loaded')
    ajaxGetStub = sinon.stub(ajax, 'get')
    ajaxGetStub
      .withArgs(api.latestStatistics)
      .returns({
        then: (success, error) => {
          success({
            'statusCode': 200,
            'data': {
              'totalPledges': 142
            }
          })
        }
      })
    ajaxGetStub
      .withArgs(api.pledgesHal)
      .returns({
        then: (success, error) => {
          success({
            'statusCode': 200,
            'data': page1()
          })
        }
      })
    ajaxGetStub
      .withArgs(api.prefix(page1().links.next))
      .returns({
        then: (success, error) => {
          success({
            'statusCode': 200,
            'data': page2()
          })
        }
      })

    sut = new ViewPledges()
  })

  afterEach(() => {
    browser.loading.restore()
    browser.loaded.restore()
    ajax.get.restore()
  })

  it('- Should set pledges', () => {
    expect(sut.pledges().length).toEqual(page1().items.length)
    expect(sut.pledges()[0].signature).toEqual('Tamsin Sharp')
  })

  it('- Should set total pledges', () => {
    expect(sut.totalPledges()).toEqual(142)
  })

  it('- Should set moreAvailable to true', () => {
    expect(sut.moreAvailable()).toBeTruthy()
  })

  describe('- Next page', () => {
    beforeEach(() => {
      sut.loadNext()
    })

    it('- Should concat pledges with next page', () => {
      let total = page1()..items.length + page2().items.length
      expect(sut.pledges().length).toEqual(total)
      expect(sut.pledges()[total - 1].signature).toEqual('CityCo and Heart of Manchester Business Improvement District') // organisation signature
    })

    it('- Should set moreAvailable to false', () => {
      expect(sut.moreAvailable()).toBeFalsy()
    })
  })
})

const page1 = () => {
  return {
    'links': {
      'next': '/v2/approved-charter-supporters?index=5',
      'prev': null,
      'self': '/v2/approved-charter-supporters?index=0'
    },
    'items': [
      {
        'firstName': 'Tamsin',
        'lastName': 'Sharp',
        'organisation': null,
        'creationDate': '2016-05-09T21:11:41.8500000Z',
        'pledge': 'Learn what services are available and how i can help',
        'isFeatured': false
      },
      {
        'firstName': 'Jennifer',
        'lastName': 'Radcliffe',
        'organisation': 'Morgan Hunt',
        'creationDate': '2016-05-09T20:46:29.7780000Z',
        'pledge': 'Ask my employer to pledge to support the Charter',
        'isFeatured': false
      },
      {
        'firstName': 'Natalie ',
        'lastName': 'Goddard ',
        'organisation': null,
        'creationDate': '2016-05-09T17:34:02.4370000Z',
        'pledge': 'Include my name on the charter supporters database.',
        'isFeatured': false
      },
      {
        'firstName': 'Ingrid',
        'lastName': 'Turner',
        'organisation': '',
        'creationDate': '2016-05-09T13:17:02.5370000Z',
        'pledge': 'Include my name on the charter supporters database.',
        'isFeatured': false
      },
      {
        'firstName': 'Lauren',
        'lastName': 'Banks',
        'organisation': null,
        'creationDate': '2016-05-09T12:54:07.0620000Z',
        'pledge': 'Learn what services are available and how i can help',
        'isFeatured': false
      }
    ],
    'total': 8
  }
}

const page2 = () => {
  return {
    'links': {
      'next': null,
      'prev': '/v2/approved-charter-supporters?index=0',
      'self': '/v2/approved-charter-supporters?index=5'
    },
    'items': [
      {
        'firstName': 'Colin',
        'lastName': 'Barson',
        'organisation': 'Diocese of Manchester &amp; Greater Together Manchester',
        'creationDate': '2016-05-09T09:14:51.7690000Z',
        'pledge': 'Provide emergency accommodation for rough sleepers via the rolling Greater Manchester Winter Night Shelter; Seek funding to increase the duration to six months over the winter of 2016/17; Seek additional partners, in order to increase the size of provision without compromising quality; Rt. Rev Dr. David Walker, the Bishop of Manchester, commits to chairing the Manchester Homelessness Partnership board, which will provide governance for the work of the MHP; Encourage churches in the Diocese of Manchester to adopt the vision and values of the Manchester Homelessness Charter, and to make their own pledges to help end homelessness;',
        'isFeatured': true
      },
      {
        'firstName': 'Carla',
        'lastName': 'Nuttall',
        'organisation': 'Manchester Metropolitan University',
        'creationDate': '2016-05-09T09:11:14.1540000Z',
        'pledge': 'Engage in research related activity, guided by the priorities of the Manchester Homelessness Partnership; Raise awareness of the Charter, and highlight the most effective ways for staff and students to help those who are homeless or at risk of homelessness; Promote opportunities for staff and students to engage in volunteering, fundraising and other potential projects in support of the Charter; Actively support the Big Change Fund - Manchester&rsquo;s alternative giving campaign;',
        'isFeatured': true
      },
      {
        'firstName': 'Alexandra',
        'lastName': 'King ',
        'organisation': 'CityCo and Heart of Manchester Business Improvement District',
        'creationDate': '2016-05-09T08:55:31.9570000Z',
        'pledge': 'Promote BigChangeMCR and deliver educational workshops to our businesses; Ensure that businesses in Manchester city centre are aware of how to access outreach services, charitable organisations and volunteering opportunities through Street Support; Actively encourage businesses to develop employment schemes for people who have experienced or are experiencing homelessness; CityCo and BID business members will treat rough sleepers with respect and dignity and encourage those rough sleepers to seek the assistance available to them to help build a better future.;',
        'isFeatured': false
      }
    ],
    'total': 8
  }
}

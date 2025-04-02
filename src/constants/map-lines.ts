import type { Prj } from '@/stores/projectsStore'

export interface MapPoint {
  x: number
  y: number
  color: string
  projName: string
  projId: number
  textX?: number
  textY?: number
  textAnchor?: string
}

export interface MapLine {
  d: string
  color: string
}

export class PointPlacer {
  static shortenName(name: string) {
    switch (name) {
      case 'Комплексная информационная система адвокатуры России (КИС АР)':
        return 'КИС АР'
      case 'Юридическая операционная система (ЮОС)':
        return 'ЮОС'
      default:
        return name
    }
  }

  static VertPurpleMakePoints(pathElement: SVGPathElement, projects: Prj[]) {
    const pathLength = pathElement.getTotalLength()
    const points: MapPoint[] = []

    const firstBreakpoint = pathLength * 0.18
    const secondBreakpoint = pathLength * 0.37
    const thirdBreakpoint = pathLength * 0.41
    const fourthBreakpoint = pathLength * 0.59
    const fifthBreakpoint = pathLength * 0.63
    const sixthBreakpoint = pathLength * 0.82

    const actualPathLength = pathLength * 0.44
    const pointCount = projects.length - 1
    const step = actualPathLength / pointCount
    let indexAfterBreakpoint = 0
    let breakpointLeftover = 0
    let passedFirstBreakpoint = false
    let passedThirdBreakpoint = false
    let passedFifthBreakpoint = false

    projects.forEach((project, index) => {
      let point = null
      let textX = 0
      let textY = 0
      let textAnchor = ''

      if (!passedFirstBreakpoint) {
        point = pathElement.getPointAtLength(step * index)

        if (step * (index + 1) > firstBreakpoint) {
          breakpointLeftover = index * (step + 1) - firstBreakpoint
          passedFirstBreakpoint = true
        }
      } else if (!passedThirdBreakpoint) {
        point = pathElement.getPointAtLength(
          secondBreakpoint + step * indexAfterBreakpoint + breakpointLeftover,
        )

        indexAfterBreakpoint++

        if (
          secondBreakpoint + step * (indexAfterBreakpoint + 1) + breakpointLeftover >
          thirdBreakpoint
        ) {
          breakpointLeftover =
            secondBreakpoint +
            step * (indexAfterBreakpoint + 1) +
            breakpointLeftover -
            thirdBreakpoint
          indexAfterBreakpoint = 0
          passedThirdBreakpoint = true
        }
      } else if (!passedFifthBreakpoint) {
        point = pathElement.getPointAtLength(
          fourthBreakpoint + step * indexAfterBreakpoint + breakpointLeftover,
        )

        indexAfterBreakpoint++

        if (
          fourthBreakpoint + step * (indexAfterBreakpoint + 1) + breakpointLeftover >
          fifthBreakpoint
        ) {
          breakpointLeftover =
            fourthBreakpoint +
            step * (indexAfterBreakpoint + 1) +
            breakpointLeftover -
            fifthBreakpoint
          indexAfterBreakpoint = 0
          passedFifthBreakpoint = true
        }
      } else {
        point = pathElement.getPointAtLength(
          sixthBreakpoint + step * indexAfterBreakpoint + breakpointLeftover,
        )

        indexAfterBreakpoint++
      }

      textX = point.x
      textY = point.y > 550 ? point.y - 20 : point.y + 20
      textAnchor = 'middle'

      points.push({
        x: point.x,
        y: point.y,
        color: pathElement.getAttribute('stroke')!,
        projName: project.name,
        projId: project.id,
        textX: textX,
        textY: textY,
        textAnchor: textAnchor,
      })
    })

    return points
  }

  static SideMakePoints(pathElement: SVGPathElement, projects: Prj[]) {
    const pathLength = pathElement.getTotalLength()
    const points: MapPoint[] = []

    const firstBreakpoint = pathLength * 0.3

    const actualPathLength = pathLength * 0.4
    const pointCount = projects.length - 3
    const step = actualPathLength / pointCount

    projects.forEach((project, index) => {
      let point = null
      let textX = 0
      let textY = 0
      let textAnchor = ''

      if (index == 0) {
        point = pathElement.getPointAtLength(0)
      } else if (index == projects.length - 1) {
        point = pathElement.getPointAtLength(pathLength)
      } else {
        point = pathElement.getPointAtLength(firstBreakpoint + step * (index - 1))
      }

      textX = point.x > 650 ? point.x + 15 : point.x - 15
      textY = point.y + 5
      textAnchor = point.x > 650 ? 'start' : 'end'

      points.push({
        x: point.x,
        y: point.y,
        color: pathElement.getAttribute('stroke')!,
        projName: this.shortenName(project.name)!,
        projId: project.id,
        textX: textX,
        textY: textY,
        textAnchor: textAnchor,
      })
    })

    return points
  }

  static TopBottomMakePoints(pathElement: SVGPathElement, projects: Prj[]) {
    const pathLength = pathElement.getTotalLength()
    const points: MapPoint[] = []

    const upperBreakpoint = pathLength * 0.64
    const lowerBreakpoint = pathLength * 0.36

    const actualPathLength = pathLength * 0.72
    const pointCount = projects.length - 1
    const step = actualPathLength / pointCount
    let indexAfterBreakpoint = 0
    let breakpointLeftover = 0
    let passedBreakpoint = false

    projects.forEach((project, index) => {
      let point = null
      let textX = 0
      let textY = 0
      let textAnchor = ''

      if (index * step <= lowerBreakpoint) {
        point = pathElement.getPointAtLength(step * index)
        textX = point.y > 500 ? point.x + 20 : point.x - 20
        textY = point.y > 500 ? point.y + 20 : point.y - 20
        textAnchor = 'middle'
      } else {
        if (!passedBreakpoint) {
          breakpointLeftover = index * step - lowerBreakpoint
          passedBreakpoint = true
        }

        point = pathElement.getPointAtLength(
          upperBreakpoint + step * indexAfterBreakpoint + breakpointLeftover,
        )

        textX = point.y > 500 ? point.x - 20 : point.x + 20
        textY = point.y > 500 ? point.y + 20 : point.y - 20
        textAnchor = 'middle'

        indexAfterBreakpoint++
      }

      points.push({
        x: point.x,
        y: point.y,
        color: pathElement.getAttribute('stroke')!,
        projName: project.name,
        projId: project.id,
        textX: textX,
        textY: textY,
        textAnchor: textAnchor,
      })
    })

    return points
  }

  static HorYellowMakePoints(pathElement: SVGPathElement, projects: Prj[]) {
    const pathLength = pathElement.getTotalLength()
    const points: MapPoint[] = []

    const firstBreakpoint = pathLength * 0.12
    const secondBreakpoint = pathLength * 0.19
    const thirdBreakpoint = pathLength * 0.27
    const fourthBreakpoint = pathLength * 0.75
    const fifthBreakpoint = pathLength * 0.85
    const sixthBreakpoint = pathLength * 0.88

    const actualPathLength = pathLength * 0.42
    const pointCount = projects.length - 1
    const step = actualPathLength / pointCount
    let indexAfterBreakpoint = 0
    let breakpointLeftover = 0
    let passedFirstBreakpoint = false
    let passedThirdBreakpoint = false
    let passedFifthBreakpoint = false

    projects.forEach((project, index) => {
      let point = null
      let textX = 0
      let textY = 0
      let textAnchor = ''

      if (!passedFirstBreakpoint) {
        point = pathElement.getPointAtLength(step * index)

        textX = point.x + 17
        textY = point.y + 5
        textAnchor = 'start'
        if (step * (index + 1) > firstBreakpoint) {
          breakpointLeftover = index * (step + 1) - firstBreakpoint
          passedFirstBreakpoint = true
        }
      } else if (!passedThirdBreakpoint) {
        point = pathElement.getPointAtLength(
          secondBreakpoint + step * indexAfterBreakpoint + breakpointLeftover,
        )

        textX = point.x + 17
        textY = point.y + 5
        textAnchor = 'start'
        indexAfterBreakpoint++

        if (
          secondBreakpoint + step * (indexAfterBreakpoint + 1) + breakpointLeftover >
          thirdBreakpoint
        ) {
          breakpointLeftover =
            secondBreakpoint +
            step * (indexAfterBreakpoint + 1) +
            breakpointLeftover -
            thirdBreakpoint
          indexAfterBreakpoint = 0
          passedThirdBreakpoint = true
        }
      } else if (!passedFifthBreakpoint) {
        point = pathElement.getPointAtLength(
          fourthBreakpoint + step * indexAfterBreakpoint + breakpointLeftover,
        )

        textX = point.x - 17
        textY = point.y + 5
        textAnchor = 'end'
        indexAfterBreakpoint++

        if (
          fourthBreakpoint + step * (indexAfterBreakpoint + 1) + breakpointLeftover >
          fifthBreakpoint
        ) {
          breakpointLeftover =
            fourthBreakpoint +
            step * (indexAfterBreakpoint + 1) +
            breakpointLeftover -
            fifthBreakpoint
          indexAfterBreakpoint = 0
          passedFifthBreakpoint = true
        }
      } else {
        point = pathElement.getPointAtLength(
          sixthBreakpoint + step * indexAfterBreakpoint + breakpointLeftover,
        )

        textX = point.x - 17
        textY = point.y + 5
        textAnchor = 'end'
        indexAfterBreakpoint++
      }

      points.push({
        x: point.x,
        y: point.y,
        color: pathElement.getAttribute('stroke')!,
        projName: project.name,
        projId: project.id,
        textX: textX,
        textY: textY,
        textAnchor: textAnchor,
      })
    })

    return points
  }

  static HorGreenMakePoints(pathElement: SVGPathElement, projects: Prj[]) {
    const pathLength = pathElement.getTotalLength()
    const points: MapPoint[] = []

    const firstBreakpoint = pathLength * 0.1
    const secondBreakpoint = pathLength * 0.2
    const thirdBreakpoint = pathLength * 0.28
    const fourthBreakpoint = pathLength * 0.75
    const fifthBreakpoint = pathLength * 0.85
    const sixthBreakpoint = pathLength * 0.88

    const actualPathLength = pathLength * 0.4
    const pointCount = projects.length - 1
    const step = actualPathLength / pointCount
    let indexAfterBreakpoint = 0
    let breakpointLeftover = 0
    let passedFirstBreakpoint = false
    let passedThirdBreakpoint = false
    let passedFifthBreakpoint = false

    projects.forEach((project, index) => {
      let point = null
      let textX = 0
      let textY = 0
      let textAnchor = ''
      if (!passedFirstBreakpoint) {
        point = pathElement.getPointAtLength(step * index)
        textX = point.x - 17
        textY = point.y + 5
        textAnchor = 'end'
        if (step * (index + 1) > firstBreakpoint) {
          breakpointLeftover = index * (step + 1) - firstBreakpoint
          passedFirstBreakpoint = true
        }
      } else if (!passedThirdBreakpoint) {
        point = pathElement.getPointAtLength(
          secondBreakpoint + step * indexAfterBreakpoint + breakpointLeftover,
        )

        textX = point.x - 17
        textY = point.y + 5
        textAnchor = 'end'

        indexAfterBreakpoint++

        if (
          secondBreakpoint + step * (indexAfterBreakpoint + 1) + breakpointLeftover >
          thirdBreakpoint
        ) {
          breakpointLeftover =
            secondBreakpoint +
            step * (indexAfterBreakpoint + 1) +
            breakpointLeftover -
            thirdBreakpoint
          indexAfterBreakpoint = 0
          passedThirdBreakpoint = true
        }
      } else if (!passedFifthBreakpoint) {
        point = pathElement.getPointAtLength(
          fourthBreakpoint + step * indexAfterBreakpoint + breakpointLeftover,
        )

        textX = point.x + 17
        textY = point.y + 5
        textAnchor = 'start'

        indexAfterBreakpoint++

        if (
          fourthBreakpoint + step * (indexAfterBreakpoint + 1) + breakpointLeftover >
          fifthBreakpoint
        ) {
          breakpointLeftover =
            fourthBreakpoint +
            step * (indexAfterBreakpoint + 1) +
            breakpointLeftover -
            fifthBreakpoint
          indexAfterBreakpoint = 0
          passedFifthBreakpoint = true
        }
      } else {
        point = pathElement.getPointAtLength(
          sixthBreakpoint + step * indexAfterBreakpoint + breakpointLeftover,
        )
        textX = point.x + 17
        textY = point.y + 5
        textAnchor = 'start'
        indexAfterBreakpoint++
      }

      points.push({
        x: point.x,
        y: point.y,
        color: pathElement.getAttribute('stroke')!,
        projName: project.name,
        projId: project.id,
        textX: textX,
        textY: textY,
        textAnchor: textAnchor,
      })
    })

    return points
  }

  static CentralLightRedMakePoints(pathElement: SVGPathElement, projects: Prj[]) {
    const pathLength = pathElement.getTotalLength()
    const points: MapPoint[] = []

    const upperBreakpoint = pathLength * 0.63
    const lowerBreakpoint = pathLength * 0.35

    const actualPathLength = pathLength * 0.72
    const pointCount = projects.length - 1
    const step = actualPathLength / pointCount
    let indexAfterBreakpoint = 0
    let breakpointLeftover = 0
    let passedBreakpoint = false

    projects.forEach((project, index) => {
      let point = null
      let textX = 0
      let textY = 0
      let textAnchor = ''

      if (index * step <= lowerBreakpoint) {
        point = pathElement.getPointAtLength(step * index)

        textX = point.x + 25
        textY = point.y + 15
        textAnchor = 'middle'
      } else {
        if (!passedBreakpoint) {
          breakpointLeftover = index * step - lowerBreakpoint
          passedBreakpoint = true
        }

        point = pathElement.getPointAtLength(
          upperBreakpoint + step * indexAfterBreakpoint + breakpointLeftover,
        )

        textX = point.x - 25
        textY = point.y - 15
        textAnchor = 'middle'
        indexAfterBreakpoint++
      }

      points.push({
        x: point.x,
        y: point.y,
        color: pathElement.getAttribute('stroke')!,
        projName: project.name,
        projId: project.id,
        textX: textX,
        textY: textY,
        textAnchor: textAnchor,
      })
    })

    return points
  }

  static CentralDarkBlueMakePoints(pathElement: SVGPathElement, projects: Prj[]) {
    const pathLength = pathElement.getTotalLength()
    const points: MapPoint[] = []

    const upperBreakpoint = pathLength * 0.64
    const lowerBreakpoint = pathLength * 0.36

    const actualPathLength = pathLength * 0.72
    const pointCount = projects.length - 1
    const step = actualPathLength / pointCount
    let indexAfterBreakpoint = 0
    let breakpointLeftover = 0
    let passedBreakpoint = false

    projects.forEach((project, index) => {
      let point = null
      let textX = 0
      let textY = 0
      let textAnchor = ''

      if (index * step <= lowerBreakpoint) {
        point = pathElement.getPointAtLength(step * index)

        textX = point.x + 25
        textY = point.y - 15
        textAnchor = 'middle'
      } else {
        if (!passedBreakpoint) {
          breakpointLeftover = index * step - lowerBreakpoint
          passedBreakpoint = true
        }

        point = pathElement.getPointAtLength(
          upperBreakpoint + step * indexAfterBreakpoint + breakpointLeftover,
        )
        textX = point.x - 25
        textY = point.y + 15
        textAnchor = 'middle'

        indexAfterBreakpoint++
      }

      points.push({
        x: point.x,
        y: point.y,
        color: pathElement.getAttribute('stroke')!,
        projName: project.name,
        projId: project.id,
        textX: textX,
        textY: textY,
        textAnchor: textAnchor,
      })
    })

    return points
  }

  static VertLightBlueMakePoints(pathElement: SVGPathElement, projects: Prj[]) {
    const pathLength = pathElement.getTotalLength()
    const points: MapPoint[] = []

    const upperBreakpoint = pathLength * 0.71
    const lowerBreakpoint = pathLength * 0.28

    const actualPathLength = pathLength * 0.57
    const pointCount = projects.length - 1
    const step = actualPathLength / pointCount
    let indexAfterBreakpoint = 0
    let breakpointLeftover = 0
    let passedBreakpoint = false

    projects.forEach((project, index) => {
      let point = null

      if (index * step <= lowerBreakpoint) {
        point = pathElement.getPointAtLength(step * index)
      } else {
        if (!passedBreakpoint) {
          breakpointLeftover = index * step - lowerBreakpoint
          passedBreakpoint = true
        }

        point = pathElement.getPointAtLength(
          upperBreakpoint + step * indexAfterBreakpoint + breakpointLeftover,
        )

        indexAfterBreakpoint++
      }

      points.push({
        x: point.x,
        y: point.y,
        color: pathElement.getAttribute('stroke')!,
        projName: project.name,
        projId: project.id,
        textX: point.x + 17,
        textY: point.y + 5,
        textAnchor: 'start',
      })
    })

    return points
  }

  static VertDarkRedMakePoints(pathElement: SVGPathElement, projects: Prj[]) {
    const pathLength = pathElement.getTotalLength()
    const points: MapPoint[] = []

    const upperBreakpoint = pathLength * 0.72
    const lowerBreakpoint = pathLength * 0.27

    const actualPathLength = pathLength * 0.55
    const pointCount = projects.length - 1
    const step = actualPathLength / pointCount
    let indexAfterBreakpoint = 0
    let breakpointLeftover = 0
    let passedBreakpoint = false

    projects.forEach((project, index) => {
      let point = null

      if (index * step <= lowerBreakpoint) {
        point = pathElement.getPointAtLength(step * index)
      } else {
        if (!passedBreakpoint) {
          breakpointLeftover = index * step - lowerBreakpoint
          passedBreakpoint = true
        }

        point = pathElement.getPointAtLength(
          upperBreakpoint + step * indexAfterBreakpoint + breakpointLeftover,
        )
        indexAfterBreakpoint++
      }

      points.push({
        x: point.x,
        y: point.y,
        color: pathElement.getAttribute('stroke')!,
        projName: project.name,
        projId: project.id,
        textX: point.x - 17,
        textY: point.y + 5,
        textAnchor: 'end',
      })
    })

    return points
  }
}

export const MAP_LINES: readonly MapLine[] = [
  { d: 'M646 77L643 1023', color: '#935A91' },
  {
    d: 'M1188 939.795C1188 706.397 1003.5 592.252 1003.5 592.252L296.5 592.252C296.5 592.252 112 714.295 112 939.795',
    color: '#E3B446',
  },
  {
    d: 'M755.752 77C755.752 96.7738 757.496 208.339 751.731 226.583C745.966 244.826 737.527 261.368 726.916 275.276C716.306 289.183 703.737 300.179 689.944 307.668C676.152 315.156 661.391 319 646.5 319C631.609 319 616.848 315.156 603.056 307.668C589.263 300.179 576.694 289.183 566.084 275.276C555.473 261.368 547.034 244.826 541.269 226.583C535.504 208.34 537.248 96.7738 537.248 77',
    color: '#DADE52',
  },
  {
    d: 'M534.248 1023C534.248 1003.23 532.504 891.661 538.269 873.417C544.034 855.174 552.473 838.632 563.084 824.724C573.694 810.817 586.263 799.821 600.056 792.332C613.848 784.844 628.609 781 643.5 781C658.391 781 673.152 784.844 686.944 792.332C700.737 799.821 713.306 810.817 723.916 824.724C734.527 838.632 742.966 855.174 748.731 873.417C754.496 891.66 752.752 1003.23 752.752 1023',
    color: '#91BB58',
  },
  { d: 'M300 1023V77', color: '#9A292E' },
  {
    d: 'M378.747 76.0002L378.738 315.406L908.759 792.698L908.75 1022.11',
    color: '#432F6E',
  },
  {
    d: 'M377.773 1022.36L377.939 793.548L908.767 315.557L908.94 76.7535',
    color: '#BC3836',
  },
  {
    d: 'M112 169.252C112 402.65 296.5 516.795 296.5 516.795H1003.5C1003.5 516.795 1188 394.752 1188 169.252',
    color: '#629C4E',
  },
  {
    d: 'M1176 726.607C1142.01 726.607 950.226 729.371 918.866 720.236C887.506 711.101 859.07 697.729 835.162 680.917C811.255 664.106 792.353 644.191 779.479 622.335C766.607 600.482 760 577.095 760 553.5C760 529.905 766.607 506.518 779.479 484.665C792.353 462.809 811.255 442.894 835.162 426.083C859.07 409.27 887.506 395.898 918.866 386.764C950.226 377.629 1142.01 380.393 1176 380.393',
    color: '#394D8B',
  },
  {
    d: 'M100 380.393C135.462 380.393 335.543 377.629 368.26 386.764C400.977 395.899 430.643 409.271 455.586 426.083C480.527 442.894 500.247 462.809 513.678 484.665C527.107 506.518 534 529.905 534 553.5C534 577.095 527.107 600.482 513.678 622.335C500.247 644.191 480.527 664.106 455.586 680.917C430.643 697.73 400.977 711.102 368.26 720.236C335.543 729.371 135.462 726.607 100 726.607',
    color: '#5E5C58',
  },
  { d: 'M1010 1023V77', color: '#6D9AB4' },
]
